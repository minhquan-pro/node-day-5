const userModel = require("@/models/user.model");

class UserService {
	async findUserByEmail(email) {
		const result = await userModel.findUserByEmail(email);
		return result;
	}
}

module.exports = new UserService();
