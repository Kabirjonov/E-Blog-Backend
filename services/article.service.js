const BaseError = require("../Errors/Base.error");
const { Article } = require("../models/Article.model");
const fileService = require("./file.service");

class articleService {
	async getAll() {
		return await Article.find().populate("auther");
	}
	async getById(id) {
		const data = await Article.findById(id).populate("auther");
		if (!id) throw BaseError.BadRequest("id not found");
		return data;
	}
	async create(body, picture) {
		const fileName = fileService.save(picture);
		return await Article.create({ ...body, picture: fileName });
	}
	async edit(id, body, picture) {
		if (!id) throw BaseError.BadRequest("id not found");
		if (picture) {
			const fileName = fileService.save(picture);
			body.picture = fileName;
		}
		const result = await Article.findByIdAndUpdate(id, body, { new: true });
		return result;
	}
	async delete(id) {
		const result = await Article.findByIdAndDelete(id);
		if (!result) {
			throw BaseError.BadRequest("Article not found");
		}
		return result;
	}
}
module.exports = new articleService();
