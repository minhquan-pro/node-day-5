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

	async handleLogin(email, password) {
		const user = await authModel.findUserByEmail(email);

		if (!user) {
			return [true, null];
		}

		const isValid = await bcrypt.compare(password, user.password);

		if (isValid) {
			const accessToken = await this.generateAccessToken(user);
			const accessTokenTTL = authConfig.accessTokenTTL;

			return [null, { user, accessToken, accessTokenTTL }];
		}

		return [true, null];
	}

	async generateAccessToken(user) {
		const expireAt = Math.floor(Date.now() / 1000 + authConfig.accessTokenTTL);
		const payload = { sub: user.id, exp: expireAt };

		const token = jwt.sign(payload, authConfig.jwtSecret);

		return token;
	}

	async getUserById(id) {
		const user = await authModel.findUserById(id);
		return user;
	}
}

module.exports = new AuthService();
