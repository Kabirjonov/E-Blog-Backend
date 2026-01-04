const authService = require("../services/auth.service");
const userService = require("../services/user.service");

class UserController {
	async getAll(req, res) {
		const result = await userService.getAll();
		res
			.status(200)
			.send({ message: "All user list", body: result, status: 200 });
	}
	async getById(req, res) {
		const result = await userService.getById(req.params.id);
		res.status(200).send({ message: "", body: result, status: 200 });
	}
	async delete(req, res) {
		const { refreshToken } = req.cookies;
		const result = await userService.delete(req.params.id);
		await authService.logout(refreshToken);
		res.clearCookie("refreshToken");
		res
			.status(200)
			.send({ message: "user is deleted", body: result, status: 200 });
	}
	async edit(req, res) {
		const { body, params } = req;
		const user = await userService.edit(body, params.id);
		res
			.status(200)
			.send({ message: "User is updated", body: user, status: 204 });
	}
}

module.exports = new UserController();
