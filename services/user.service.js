const BaseError = require("../Errors/Base.error");
const { User } = require("../models/User.model");
const fileService = require("./file.service");

class UserService {
	async getAll() {
		return await User.find().select("-password");
	}
	async getById(id) {
		const user = await User.findById(id).select("-password").populate();
		if (!user || !id) throw BaseError.BedRequest(404, "User not found");
		return user;
	}
	async create(body, picture) {
		const fileName = fileService.save(picture);
		const user = await User.create({ ...body, picture: fileName });
		return user;
	}
	async delete(id) {
		const user = await User.findByIdAndDelete(id);
		if (!user || !id) throw BaseError.BedRequest(404, "User not found");
		if (user.picture) {
			await fileService.delete(user.picture);
		}
		return user;
	}
	async edit(body, id) {
		const update = await User.findByIdAndUpdate(id, body, { new: true });
		if (!update || !id) throw BaseError.BedRequest(404, "User not found");
		return update;
	}
}

module.exports = new UserService();
