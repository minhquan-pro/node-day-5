const express = require("express");
const router = express();

const authController = require("@/controllers/auth.controller");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/me", authController.getCurrentUser);

module.exports = router;
