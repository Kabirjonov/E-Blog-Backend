const UserDto = require("../dtos/user.dto");
const { User } = require("../models/User.model");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const BaseError = require("../Errors/Base.error");
const mailService = require("./mail.service");
const fileService = require("./file.service");
const { RoleEnum } = require("../constants/RoleEnum");

class AuthService {
	async register(body, picture) {
		const { username, email, password } = body;
		const existUser = await User.findOne({ email });
		if (existUser) {
			throw BaseError.BadRequest(400, `${email} this email already registered`);
		}
		const hashPassword = await bcrypt.hash(password, 10);
		const fileName = fileService.save(picture);
		const user = await User.create({
			username,
			email,
			password: hashPassword,
			picture: fileName,
		});
		const userDto = new UserDto(user);
		const tokens = tokenService.generateToken({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return { user: userDto, ...tokens };
	}

	async login(email, password) {
		const user = await User.findOne({ email });
		if (!user)
			throw BaseError.BadRequest(400, "email or password is incorrect");
		const isPassword = await bcrypt.compare(password, user.password);
		if (!isPassword) {
			throw BaseError.BadRequest(400, "email or password is incorrect");
		}
		const userDto = new UserDto(user);
		const tokens = tokenService.generateToken({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return { user: userDto, ...tokens };
	}
	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}
	async refresh(refreshToken) {
		if (!refreshToken) {
			throw BaseError.BadRequest(400, "Bed authorization");
		}

		const userPayload = tokenService.validateRefreshToken(refreshToken);
		const tokenDB = await tokenService.findToken(refreshToken);
		if (!tokenDB || !userPayload) {
			throw BaseError.BadRequest(400, "Bed authorization");
		}
		const user = await User.findById(userPayload.id);
		const userDto = new UserDto(user);
		const tokens = tokenService.generateToken({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return { user: userDto, ...tokens };
	}
	async forgotPassword(email) {
		const user = await User.findOne({ email });
		if (!user) {
			throw BaseError.BadRequest("User not found");
		}
		const resetToken = await tokenService.createResetToken(user._id);
		const resetUrl = `${process.env.CLIENT_URL}/recovery-account/${resetToken}`;
		await mailService.sendMail(email, resetUrl);
		return 200;
	}
	async resetPassword(token, password) {
		const result = await tokenService.resetPassword(token);
		if (!result) {
			throw BaseError.BadRequest("Token is invalid or expired");
		}
		const newHashPasswor = await bcrypt.hash(password, 10);
		await User.findByIdAndUpdate(
			result.user._id,
			{ password: newHashPasswor },
			{ new: true }
		);
	}
	async updateUserRole(id, role) {
		const validRoles = [RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.SUPERADMIN];
		if (!validRoles.includes(role)) {
			throw BaseError.BadRequest("Invalid role");
		}
		const result = await User.findByIdAndUpdate(id, { role }, { new: true });
		if (!result || !id) throw BaseError.BadRequest(404, "User not found");
		return result;
	}
}
module.exports = new AuthService();
