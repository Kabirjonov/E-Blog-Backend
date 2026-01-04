const BaseError = require("../Errors/Base.error");
const tokenService = require("../services/token.service");
require("dotenv").config();

module.exports = function auth(req, res, next) {
	// const token = req.headers.authorization;
	const token = req.cookies.refreshToken;
	if (!token) throw BaseError.UnauthorizedError();
	try {
		const decoded = tokenService.validateAccessToken(token);
		if (!decoded) throw BaseError.UnauthorizedError();
		req.user = decoded;
		next();
	} catch (error) {
		throw BaseError.UnauthorizedError();
	}
};
