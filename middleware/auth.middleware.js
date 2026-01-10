const BaseError = require("../Errors/Base.error");
const tokenService = require("../services/token.service");
require("dotenv").config();

module.exports = function auth(req, res, next) {
	const authorization = req.headers.authorization;
	console.log("authmiddleware authorization:", authorization);
	if (!authorization) {
		return next(BaseError.UnauthorizedError());
	}
	const accessToken = authorization.split(" ")[1];
	console.log("show us accessToken", accessToken);

	if (!accessToken) {
		return next(BaseError.UnauthorizedError());
	}
	const userData = tokenService.validateAccessToken(accessToken);
	if (!userData) {
		return next(BaseError.UnauthorizedError());
	}
	console.log("authmiddleware userData:", userData);
	req.user = userData;
	next();
};
