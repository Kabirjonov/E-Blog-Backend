module.exports = class UserDto {
	email;
	id;
	role;
	constructor(module) {
		this.email = module.email;
		this.role = module.role;
		this.id = module._id;
	}
};
