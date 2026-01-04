const articleService = require("../services/article.service");
class articleController {
	async getAll(req, res) {
		const result = await articleService.getAll();
		res
			.status(200)
			.send({ message: "All articles", body: result, status: 200 });
	}
	async getById(req, res) {
		const result = await articleService.getById(req.params.id);
		res.status(200).send({
			status: 200,
			message: "article with id",
			body: result,
		});
	}
	async create(req, res) {
		// req.body.auther = req.user.id;
		const result = await articleService.create(req.body, req.files.picture);
		res.status(201).send({
			status: 201,
			message: "Article created successfully",
			body: result,
		});
	}
	async edit(req, res) {
		const { params, body } = req;
		const result = await articleService.edit(params.id, body);
		res
			.status(200)
			.send({ message: "Article is update", body: result, status: 200 });
	}
	async delete(req, res) {
		const result = await articleService.delete(req.params.id);
		res
			.status(200)
			.send({ message: "article is deleted", body: result, status: 200 });
	}
}
module.exports = new articleController();
