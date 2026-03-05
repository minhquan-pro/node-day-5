const authService = require("@/services/auth.service");

const register = async (req, res) => {
	const { email, password } = req.body;
	const result = await authService.handleRegister(email, password);
	res.success(result);
};

const login = async () => {};
const getCurrentUser = async () => {};

module.exports = { login, register, getCurrentUser };
