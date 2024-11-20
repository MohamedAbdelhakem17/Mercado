const AuthRoute = require("./authRoute")
const CategoryRoute = require("./categoryRoute")
const SubCategoryRoute = require("./subcategoryRoute")
const brandRoute = require("./brandRoute")
const productRoute = require("./productRoute")

const amountRoutes = (app) => {
    app.use("/api/v1/auth", AuthRoute)
    app.use("/api/v1/category", CategoryRoute)
    app.use("/api/v1/subcategory", SubCategoryRoute)
    app.use("/api/v1/brand", brandRoute)
    app.use("/api/v1/product", productRoute)
}



module.exports = amountRoutes 