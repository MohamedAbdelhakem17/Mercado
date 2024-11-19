const express = require("express")

const { signup, verifyEmail, resendCode, signin } = require("../controller/authController")

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/verifyEmail", verifyEmail)
router.post("/resendCode", resendCode)

module.exports = router