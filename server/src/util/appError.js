class AppError extends Error {
    constructor(message, statusCode, statusText) {
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.statusText = statusText
    }
}


module.exports = AppError