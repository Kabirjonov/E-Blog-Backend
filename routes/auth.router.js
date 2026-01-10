const express = require("express");
const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const router = express.Router();
const Validaters = require("../validator/validator");
const auth = require("../middleware/auth.middleware");
const {
	removeRole,
	canModifyUser,
} = require("../middleware/authorize.middleware");
const { RoleEnum } = require("../constants/RoleEnum");
router.post(
	"/register",
	removeRole,
	validate(Validaters.registerUser),
	authController.register
);
router.post(
	"/login",
	removeRole,
	validate(Validaters.loginUser),
	authController.login
);
router.post("/logout", auth, authController.logout);
router.get("/refresh", authController.refresh);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

router.put(
	"/update-role/:id",
	auth,
	validate(Validaters.registerUser),
	canModifyUser([RoleEnum.SUPERADMIN]),
	authController.updateUserRole
);

module.exports = router;
