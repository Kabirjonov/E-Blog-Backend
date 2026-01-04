const Joi = require("joi");

class Validaters {
	get registerUser() {
		return Joi.object({
			username: Joi.string().required().min(3).max(20),
			email: Joi.string().email().required(),
			password: Joi.string().min(6).max(255).required(),
			bio: Joi.string().allow("", null),
		});
	}
	get loginUser() {
		return Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		});
	}
	get createArticle() {
		return Joi.object({
			title: Joi.string().min(3).max(255).required(),
			description: Joi.string().min(2).required(),
			subtitle: Joi.string().min(3).max(255).required(),
		});
	}
}
module.exports = new Validaters();
