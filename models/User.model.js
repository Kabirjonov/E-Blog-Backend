const mongoose = require("mongoose");
const { RoleEnum } = require("../constants/RoleEnum");

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		picture: { type: [String] },
		bio: { type: String },
		role: {
			type: String,
			enum: RoleEnum,
			default: RoleEnum.USER,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("user", UserSchema);
module.exports = {
	User,
};
