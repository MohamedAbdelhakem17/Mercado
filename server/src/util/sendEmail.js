const nodemailer = require("nodemailer");

const transporterOption = {
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.USER_NAME,
        pass: process.env.USER_PASSWORD,
    },
}

const transporter = nodemailer.createTransport(transporterOption);


const sendEmail = async (options) => {
    await transporter.sendMail({
        to: options.to,
        subject: options.subject,
        html: options.html
    })
}

module.exports = sendEmail