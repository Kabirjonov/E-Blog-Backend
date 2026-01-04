const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const BaseError = require("../Errors/Base.error");

class fileService {
	save(file) {
		try {
			if (!fs.existsSync(path.resolve("static"))) {
				fs.mkdirSync(path.resolve("static"));
			}
			if (Array.isArray(file)) {
				const fileNames = file.map(f => this._saveSingle(f));
				return fileNames;
			}
			const fileName = this._saveSingle(file);
			return [fileName];
		} catch (e) {
			throw new Error(`File save error: ${e.message}`);
		}
	}
	_saveSingle(file) {
		const fileExt = path.extname(file.name);
		const fileName = uuidv4() + fileExt;
		const filePath = path.resolve("static", fileName);
		file.mv(filePath);
		return fileName;
	}
	delete(files) {
		try {
			const fileArray = Array.isArray(files) ? files : [files];
			for (const fileName of fileArray) {
				const filePath = path.resolve("static", fileName);
				if (fs.existsSync(filePath)) {
					fs.unlinkSync(filePath);
				}
			}
		} catch (e) {
			console.error("File delete error:", e.message);
			throw BaseError.BadRequest("Error deleting file:", error.message);
		}
	}
}
module.exports = new fileService();
