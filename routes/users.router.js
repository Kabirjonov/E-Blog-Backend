const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {
	canModifyUser,
	removeRole,
	canModifyArticle,
} = require("../middleware/authorize.middleware");
const { RoleEnum } = require("../constants/RoleEnum");

router.get(
	"/getAll",
	auth,
	canModifyUser([RoleEnum.ADMIN, RoleEnum.SUPERADMIN]),
	userController.getAll
);
router.get("/getById/:id", auth, userController.getById);
router.put(
	"/edit/:id",
	auth,
	removeRole,
	canModifyUser([RoleEnum.ADMIN, RoleEnum.SUPERADMIN]),
	userController.edit
);
router.delete(
	"/delete/:id",
	auth,
	canModifyUser([RoleEnum.SUPERADMIN]),
	userController.delete
);

module.exports = router;
