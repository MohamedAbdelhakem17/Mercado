const AuthRoute = require("./authRoute")
const CategoryRoute = require("./categoryRoute")

const amountRoutes = (app) => {
    app.use("/api/v1/auth", AuthRoute)
    app.use("/api/v1/category", CategoryRoute)
}



module.exports = amountRoutes