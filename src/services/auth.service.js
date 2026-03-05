const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const authModel = require("@/models/auth.model");
const authConfig = require("@/config/auth");

class AuthService {
	async handleRegister(email, password) {
		const hashPassword = await bcrypt.hash(password, saltRounds);
		const user = await authModel.register(email, hashPassword);
		const accessToken = await this.generateAccessToken(user);
		const accessTokenTTL = authConfig.accessTokenTTL;

		return {
			user,
			accessToken,
			accessTokenTTL: authConfig.accessTokenTTL,
		};
	}

	async generateAccessToken(user) {
		const expireAt = Math.floor(Date.now() / 1000 + authConfig.accessTokenTTL);
		const payload = { sub: user.id, exp: expireAt };

		const token = jwt.sign(payload, authConfig.jwtSecret);

		return token;
	}
}

module.exports = new AuthService();
