class BaseError extends Error {
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
	static Forbidden(message = "Access denied") {
		return new BaseError(403, message);
	}
	static BaseError(status = 400, message, errors = []) {
		return new BaseError(status, message, errors);
	}
}
module.exports = BaseError;
