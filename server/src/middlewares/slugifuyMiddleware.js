const slugify = require("slugify");

const slugifyMiddleware = (valid) => (req, res, next) => {
    if (req.body[valid]) {
        req.body.slug = slugify(req.body[valid])
    }
    next()
}

module.exports = slugifyMiddleware