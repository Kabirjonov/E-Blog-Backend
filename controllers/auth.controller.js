const BaseError = require("../Errors/Base.error");
const authService = require("../services/auth.service");

class AuthController {
	async register(req, res) {
		const user = await authService.register(req.body, req.files.picture);
		res.cookie("refreshToken", user.refreshToken, {
			httpOnly: true,
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});
		return res.send({
			message: "Your account created successfully",
			body: user,
			status: 200,
		});
	}
	async login(req, res) {
		const { email, password } = req.body;
		const data = await authService.login(email, password);
		res.cookie("refreshToken", data.refreshToken, {
			httpOnly: true,
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});
		return res.send({
			message: "You successfully login",
			body: data,
			status: 200,
		});
	}
	async logout(req, res) {
		const { refreshToken } = req.cookies;
		const data = await authService.logout(refreshToken);
		res.clearCookie("refreshToken");
		return res.send({ message: "", body: data, status: 200 });
	}
	async refresh(req, res) {
		console.log("refresh token controller");
		const { refreshToken } = req.cookies;
		const userData = await authService.refresh(refreshToken);
		res.cookie("refreshToken", userData.refreshToken, {
			httpOnly: true,
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});
		res.send({
			message: "",
			body: userData,
			status: 200,
		});
	}
	async forgotPassword(req, res) {
		const { email } = req.body;
		await authService.forgotPassword(email);
		res.send({
			status: 200,
			message: "We send you link to reset your password",
		});
	}
	async resetPassword(req, res) {
		const { token } = req.params;
		const { password } = req.body;
		await authService.resetPassword(token, password);
		res.send({ status: 200, message: "Password successfully reset" });
	}
	async updateUserRole(req, res) {
		const { id } = req.params;
		const { role } = req.body;
		const user = await authService.updateUserRole(id, role);
		res.status(200).send({
			message: `User role updated to ${role}`,
			body: user,
			status: 200,
		});
	}
}
module.exports = new AuthController();
