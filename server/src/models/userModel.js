const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isMobilePhone, isEmail } = require("validator");
const { userRoles } = require("../config/systemVariables");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: [true, "Username is required"],
        minLength: [5, "Username must be at least 5 characters"],
        maxLength: [25, "Username must be less than 25 characters"],
        match: [/^[a-zA-Z0-9-\s]+$/, "Username should be alphanumeric only"]
    },

    email: {
        type: String,
        validate: {
            validator: isEmail,
            message: props => `${props.value} is not a valid email`
        },
        required: [true, "You must provide an email"],
        unique: [true, "User email must be unique"]
    },

    password: {
        type: String,
        required: [true, "User password is required"],
        minLength: [8, "Password must be at least 8 characters"],
    },

    phone: {
        type: String,
        validate: {
            validator: function (value) {
                return isMobilePhone(value, "ar-EG"); 
            },
            message: props => `${props.value} is not a valid Egyptian phone number!`
        },
    },

    role: {
        type: String,
        enum: Object.values(userRoles),
        default: userRoles.USER
    },

    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            timestamps: { createdAt: true } 
        },
    ],

    addresses: [
        {
            id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            alias: { type: String, trim: true },
            details: { type: String, required: [true, "Address details are required"] },
            phone: { type: String },
            city: { type: String, required: [true, "City is required"] },
            postalCode: { type: String },
            createdAt: { type: Date, default: Date.now }
        },
    ],

    imageCover: String,

    isEmailVerified: { type: Boolean, default: false },

    emailVerificationCode: String,
    emailVerificationExpires: Date,
    isDeleted: { type: Boolean, default: false }

}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model("User", userSchema);
