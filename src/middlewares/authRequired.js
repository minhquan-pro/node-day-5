const authConfig = require("@/config/auth");
const authService = require("@/services/auth.service");
const jwt = require("jsonwebtoken");

const authRequired = async (req, res, next) => {
	const accessToken = req.headers?.authorization?.replace("Bearer", "").trim();

	if (!accessToken) return res.error();

	const payload = jwt.verify(accessToken, authConfig.jwtSecret);

	if (payload.exp < Date.now() / 1000) return res.error();

	const userId = payload.sub;
	const user = await authService.getUserById(userId);

	if (!user) return res.error();

	req.auth = { user };

	next();
};

module.exports = authRequired;
