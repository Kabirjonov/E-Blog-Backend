const BaseError = require("../Errors/Base.error");
const { Article } = require("../models/Article.model");

function canModifyArticle(allowedRoles = []) {
	return async (req, res, next) => {
		const article = await Article.findById(req.params.id);
		const authorId = req.user.id;
		if (!article) throw BaseError.BadRequest(404, "article not found");
		if (
			article.auther.toString() == authorId ||
			allowedRoles.includes(req.user.role)
		) {
			return next();
		}
		throw BaseError.Forbidden();
	};
}

function canModifyUser(allowedRoles = []) {
	return async (req, res, next) => {
		const user = req.user;
		if (allowedRoles.includes(user.role) || user.id === req.params.id) {
			return next();
		} else {
			throw BaseError.Forbidden();
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
