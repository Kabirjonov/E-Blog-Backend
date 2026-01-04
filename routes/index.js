const express = require("express");
const router = express.Router();

router.use("/user", require("./users.router"));
router.use("/auth", require("./auth.router"));
router.use("/article", require("./article.router"));

module.exports = router;
