const crypto = require("node:crypto");


const encodedResetCode = (code) =>
    crypto.createHash("sha256").update(code).digest("hex");



module.exports = encodedResetCode