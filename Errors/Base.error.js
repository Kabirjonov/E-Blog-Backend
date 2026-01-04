module.exports = class BaseError extends Error {
	status;
	errors;
	constructor(status, message, errors) {
		super(message);
		this.status = status;
		this.message = message;
		this.errors = errors;
	}
	static UnauthorizedError() {
		return new BaseError(401, "User is not authorized");
	}
	static BedRequest(status = 400, message, errors = []) {
		return new BaseError(status, message, errors);
	}
};
