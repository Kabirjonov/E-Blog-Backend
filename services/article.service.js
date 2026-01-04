const BaseError = require("../Errors/Base.error");
const { Article } = require("../models/Article.model");
const fileService = require("./file.service");

class articleService {
	async getAll() {
		return await Article.find().populate("auther");
	}
	async getById(id) {
		const data = await Article.findById(id);
		if (!id) throw BaseError.BedRequest("id not found");
		return data;
	}
	async create(body, picture) {
		const fileName = fileService.save(picture);
		return await Article.create({ ...body, picture: fileName });
	}
	async edit(id, body) {
		if (!id) {
			throw BaseError.BedRequest("id not found");
		}
		return await Article.findByIdAndUpdate(id, body, { new: true });
	}
	async delete(id) {
		const result = await Article.findByIdAndDelete(id);
		if (!result) {
			throw BaseError.BedRequest("Article not found");
		}
		return result;
	}
}
module.exports = new articleService();
