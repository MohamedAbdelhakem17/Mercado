const path = require("node:path")

require("dotenv").config({ path: ".env" });
const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const databaseConnect = require("./config/dbConnection");
const amountRoutes = require("./routes");
const globalError = require("./middlewares/globalErrorMiddleware");
const AppError = require("./util/appError");
const { httpStatus } = require("./config/systemVariables");

const app = express();

app.use(compression());
app.use(express.json());
app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "../uploads")))

// Database connection
databaseConnect();

if (process.env.MODE === "DEVELOPMENT") {
    app.use(morgan("dev"));
}

// Routes
amountRoutes(app);

// Handel NotFound Route
app.use("*", (req, res) => {
    throw new AppError(`This route ${req.hostname} not found. Please try another one.`, 404, httpStatus.FAIL)
});

// Error-handling middleware
app.use(globalError);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server running successfully on port  ${process.env.PORT}`);
});

process.on("unhandledRejection", (error) => {
    console.error(`Unhandled Rejection: ${error.name} | ${error.message}`);
    server.close(() => {
        console.log("Server shutting down...");
        process.exit(1);
    });
});
