const AuthRoute = require("./authRoute")
const CategoryRoute = require("./categoryRoute")
const SubCategoryRoute = require("./subcategoryRoute")

const amountRoutes = (app) => {
    app.use("/api/v1/auth", AuthRoute)
    app.use("/api/v1/category", CategoryRoute)
    app.use("/api/v1/subcategory", SubCategoryRoute)
}



module.exports = amountRoutes