const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")
const sendEmail = require("../util/sendEmail");
const encodedResetCode = require("../util/encodedCode");
const { verifyEmailBody } = require("../util/emailBody");
const userModel = require("../models/userModel");

/** Generates a verification code and its encoded version. */
const generateVerificationCode = () => {
    const resetCode = String(Math.floor(100000 + Math.random() * 900000));
    return { resetCode, encodedCode: encodedResetCode(resetCode) };
};

/** Sends a verification email with the provided code.*/
const sendVerificationEmail = async (email, userName, resetCode) => {
    await sendEmail({
        to: email,
        subject: "Email Verification",
        html: verifyEmailBody(userName, resetCode),
    });
};

/** Sets up a user with a new verification code and expiry, saves, and sends the email. */
const setupAndSendVerificationCode = async (user) => {
    const { resetCode, encodedCode } = generateVerificationCode();
    user.emailVerificationCode = encodedCode;
    user.emailVerificationExpires = Date.now() + 5 * 60 * 1000;
    await user.save();
    await sendVerificationEmail(user.email, user.userName, resetCode);
};

/**
 * @route POST /api/auth/signup
 * @description Creates a new user account and sends a verification email.
 */
exports.signup = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { resetCode, encodedCode } = generateVerificationCode();

    const existUser = await userModel.findOne({ email }, { email: 1, isEmailVerified: 1, userName: 1 }).exec();

    if (existUser) {
        if (existUser.isEmailVerified) {
            return res.status(400).json({ status: "FAIL", message: "This user already exists and is verified." });
        }

        existUser.emailVerificationExpires = Date.now() + 5 * 60 * 1000;
        existUser.emailVerificationCode = encodedCode;

        try {
            await setupAndSendVerificationCode(existUser);
            return res.status(200).json({ status: "SUCCESS", message: "Check your email for the verification code." });
        } catch (error) {
            return res.status(500).json({ status: "FAIL", message: "Error sending verification code. Please try again." });
        }
    }

    try {
        const user = await userModel.create({
            ...req.body,
            emailVerificationExpires: Date.now() + 5 * 60 * 1000,
            emailVerificationCode: encodedCode
        });

        await sendVerificationEmail(user.email, user.userName, resetCode);
        res.status(201).json({ status: "SUCCESS", message: "Check your email for the verification code." });
    } catch (error) {
        res.status(500).json({ status: "FAIL", message: error.message || "Signup error." });
    }
});


/**
 * @route POST /api/auth/verifyEmail
 * @description Verifies the user's email using the provided verification code.
 */
exports.verifyEmail = asyncHandler(async (req, res) => {
    const { verificationCode, email } = req.body;
    const user = await userModel.findOne({ email }).exec();

    if (!user) return res.status(404).json({ status: "FAIL", message: "User not found." });

    if (encodedResetCode(verificationCode) !== user.emailVerificationCode || user.emailVerificationExpires < Date.now()) {
        return res.status(400).json({
            status: "FAIL",
            message: user.emailVerificationExpires < Date.now() ? "Verification code expired." : "Invalid verification code.",
        });
    }

    user.isEmailVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();
    res.status(200).json({ status: "SUCCESS", message: "Email verified successfully." });
});

/**
 * @route POST /api/auth/resendCode
 * @description Resend verification code if the previous one expired or was lost.
 */
exports.resendCode = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email }).exec();

    if (!user) return res.status(404).json({ status: "FAIL", message: "User not found." });

    try {
        await setupAndSendVerificationCode(user);
        res.status(200).json({ status: "SUCCESS", message: "Check your email for the verification code." });
    } catch (error) {
        res.status(400).json({ status: "FAIL", error: error.message || "Error resending code." });
    }
});

/**
 * @route POST /api/auth/signin
 * @description User Login for website
 */
exports.signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const existUser = await userModel.findOne({ email }, { email: 1, isEmailVerified: 1, userName: 1, password: 1 }).exec();

    if (!existUser) {
        // 1 - User does not exist
        return res.status(404).json({ status: "FAIL", message: "User does not exist. Please sign up." });
    }

    if (!existUser.isEmailVerified) {
        // 2 - User exists but email is not verified
        try {
            await setupAndSendVerificationCode(existUser);
            return res.status(200).json({ status: "SUCCESS", message: "Your email is not verified. Check your email for the verification code." });
        } catch (error) {
            return res.status(500).json({ status: "FAIL", message: "Error sending verification code. Please try again." });
        }
    }

    // 3 - User exists and email is verified, check password
    const isCorrectPassword = await bcrypt.compare(password, existUser.password);
    if (!isCorrectPassword) {
        return res.status(401).json({ status: "FAIL", message: "Incorrect email or password." });
    }

    // 4 - Successful login
    res.status(200).json({ status: "SUCCESS", message: `Welcome back, ${existUser.userName}!` });
});
