const Joi = require("joi");
const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
	{
		title: { type: String },
		description: { type: String },
		subtitle: { type: String },
		picture: { type: [String] },
		auther: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			require: true,
		},
	},
	{ timestamps: true }
);

const Article = mongoose.model("article", ArticleSchema);
module.exports = {
	Article,
};
