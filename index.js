require("express-async-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
var app = express();
require("dotenv").config();
const connectDB = require("./config");
const fileUpload = require("express-fileupload");
const rateLimit = require("express-rate-limit");
const createHttpError = require("http-errors");

connectDB();

// app.use(
// 	rateLimit({
// 		windowMs: 10 * 60 * 1000, // 10 minutes
// 		max: 150, // Limit each IP to 100 requests per windowMs
// 		message:
// 			"Too many requests from this IP, please try again after 10 minutes",
// 		statusCode: 429, // Optional: Specify a custom status code
// 	})
// );
app.use(express.json());
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);
app.use(logger("dev"));
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "static")));
app.use("/api", require("./routes/index"));

app.use(function (req, res, next) {
	next(createHttpError(404));
});
app.use(require("./middleware/errorHandler"));

module.exports = app;
