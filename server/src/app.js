require("dotenv").config({ path: ".env" });
const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const databaseConnect = require("./config/dbConnection");
const amountRoutes = require("./routes");
const app = express();

app.use(compression());
app.use(express.json());

// Database connection
databaseConnect();

if (process.env.MODE === "DEVELOPMENT") {
    app.use(morgan("dev"));
}

// Routes
amountRoutes(app);

// Handel NotFound Route
app.use("*", (req, res) => {
    res.status(404).json({
        status: "Error",
        data: `This route ${req.hostname} not found. Please try another one.`
    });
});

// Error-handling middleware
app.use((error, req, res, next) => {
    res.status(500).json({
        status: "Error",
        data: `Error. Please try another one. ${error.message}`
    });
});

const server = app.listen(process.env.PORT, () => {
    console.log("Server running successfully on port " + process.env.PORT);
});

process.on("unhandledRejection", (error) => {
    console.error(`Unhandled Rejection: ${error.name} | ${error.message}`);
    server.close(() => {
        console.log("Server shutting down...");
        process.exit(1);
    });
});
