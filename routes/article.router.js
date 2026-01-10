const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();
const articleController = require("../controllers/article.controller");
const validate = require("../middleware/validate.middleware");
const Validaters = require("../validator/validator");
const { canModifyArticle } = require("../middleware/authorize.middleware");
const { RoleEnum } = require("../constants/RoleEnum");

router.get("/getAll", articleController.getAll);
router.get("/getOne/:id", articleController.getById);
router.post(
	"/create",
	auth,
	validate(Validaters.createArticle),
	articleController.create
);
router.put(
	"/edit/:id",
	auth,
	canModifyArticle([RoleEnum.ADMIN, RoleEnum.SUPERADMIN]),
	articleController.edit
);
router.delete(
	"/delete/:id",
	auth,
	canModifyArticle([RoleEnum.ADMIN, RoleEnum.SUPERADMIN]),
	articleController.delete
);

module.exports = router;
