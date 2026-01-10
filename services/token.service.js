require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Token, ForgotPassword } = require("../models/token.model");
const crypto = require("crypto");
class TokenService {
	generateToken(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
			expiresIn: "15s",
		});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
			expiresIn: "30d",
		});
		return { accessToken, refreshToken };
	}
	async saveToken(userId, refreshToken) {
		const existToken = await Token.findOne({ user: userId });
		if (existToken) {
			existToken.refreshToken = refreshToken;
			return existToken.save();
		}
		const token = await Token.create({ user: userId, refreshToken });
		return token;
	}
	async removeToken(refreshToken) {
		return await Token.findOneAndDelete({ refreshToken });
	}
	validateRefreshToken(token) {
		try {
			return jwt.verify(token, process.env.JWT_REFRESH_KEY);
		} catch (error) {
			return null;
		}
	}
	validateAccessToken(token) {
		try {
			return jwt.verify(token, process.env.JWT_ACCESS_KEY);
		} catch (error) {
			return null;
		}
	}
	async findToken(refreshToken) {
		return await Token.findOne({ refreshToken });
	}
	async createResetToken(id) {
		const resetToken = crypto.randomBytes(32).toString("hex");
		const hashedToken = crypto
			.createHash("sha256")
			.update(resetToken)
			.digest("hex");
		const resetEntry = {
			user: id,
			passwordResetToken: hashedToken,
			passwordResetExpires: new Date(Date.now() + 15 * 60 * 1000), // 15 daqiqa
		};
		await ForgotPassword.create(resetEntry);
		return resetToken;
	}
	async resetPassword(token) {
		const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
		const result = await ForgotPassword.findOne({
			passwordResetToken: hashedToken,
		});
		await ForgotPassword.deleteOne({ _id: result._id });
		return result;
	}
}
module.exports = new TokenService();
