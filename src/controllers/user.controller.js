const userService = require("@/services/user.service");

const findUserByEmail = async (req, res) => {
	try {
		const email = req.query?.q;
		if (!email) {
			return res.error("Email is required");
		}

		const user = await userService.findUserByEmail(email);

		if (!user) {
			return res.error("User not found");
		}

		return res.success(user);
	} catch (error) {
		return res.error(error.message || "Failed to fetch user");
	}
};

module.exports = { findUserByEmail };
