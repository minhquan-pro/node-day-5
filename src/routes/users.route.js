const express = require("express");
const router = express();

const userController = require("@/controllers/user.controller");

router.get("/search", userController.findUserByEmail);

module.exports = router;
