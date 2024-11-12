const asyncHandler = require("express-async-handler")
const userModel = require("../models/userModel")

// encoded Reset Code
const encodedResetCode = (code) =>
    crypto.createHash("sha256").update(code).digest("hex");

exports.signup = asyncHandler(async (req, res) => {

    const resetCode = String(Math.round(100000 + Math.random() * 99999));
    const encodedCode = encodedResetCode(resetCode);

    const user = await userModel.create({ ...req.body, emailVerificationCode: encodedCode, emailVerificationExpires: Date.now() + 5 * 60 * 1000 })
})

exports.verifyEmail = asyncHandler(async (req, res) => {
    const { verificationCode } = req.body
})