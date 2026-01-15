const articleService = require("../services/article.service");
class articleController {
	async getAll(req, res) {
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 9;

		const result = await articleService.getAll(page, limit);

		res.status(200).send({
			message: "All articles",
			status: 200,
			body: result,
		});
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
		req.body.auther = req.user.id;
		const result = await articleService.create(req.body, req.files.picture);
		res.status(201).send({
			status: 201,
			message: "Article created successfully",
			body: result,
		});
	}
	async edit(req, res) {
		const { params, body } = req;
		console.log(params, body);
		const result = await articleService.edit(
			params.id,
			body,
			req.files?.picture
		);
		res
			.status(200)
			.send({ message: "Article is update", body: result, status: 200 });
	}
	async delete(req, res) {
		const result = await articleService.delete(req.params.id);
		res.status(200).send({
			message: "Article is deleted successfully",
			body: result,
			status: 200,
		});
	}
}
module.exports = new articleController();
