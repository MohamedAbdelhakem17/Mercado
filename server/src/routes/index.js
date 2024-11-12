const AuthRoute = require("./authRoute")
const amountRoutes = (app) => {
    app.use("/api/v1/auth", AuthRoute)
}



module.exports = amountRoutes