const { httpStatus } = require("../config/systemVariables")

const globalError = (error, req, res, next) => {
    const statusCode = error.statusCode || 500
    const statusText = error.statusText || httpStatus.ERROR
    const { message } = error
    const stack = process.env.MODE === "DEVELOPMENT" ? error.stack : undefined

    res.status(statusCode).json({ status: statusText, message, stack })
}


module.exports = globalError;
