const BaseError = require("../Errors/Base.error");
const { Article } = require("../models/Article.model");

function canModifyArticle(allowedRoles = []) {
	return async (req, res, next) => {
		const article = await Article.findById(req.params.id);
		if (!article) throw BaseError.BedRequest("article not found");
		if (
			article.author !== req.user.id &&
			!allowedRoles.includes(req.user.role)
		) {
			throw BaseError.BedRequest("Access denied");
		}
		next();
	};
}
function canModifyUser(allowedRoles = []) {
	return async (req, res, next) => {
		const user = req.user;
		if (allowedRoles.includes(user.role) || user.id === req.params.id) {
			next();
		} else {
			throw BaseError.BedRequest(400, "Access denied");
		}
	};
}
function removeRole(req, res, next) {
	if ("role" in req.body) {
		delete req.body.role;
	}
	next();
}

module.exports = { canModifyArticle, canModifyUser, removeRole };
