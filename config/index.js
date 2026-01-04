const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
	try {
		console.log("DB_URL:", process.env.DB_URL);
		console.log("PORT:", process.env.PORT);
		await mongoose.connect(process.env.DB_URL);
		console.log("MongoDB connected");
	} catch (err) {
		console.error("MongoDB connection error:", err);
	}
};

module.exports = connectDB;
