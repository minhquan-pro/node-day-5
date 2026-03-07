const pool = require("@/config/database");

class UserModel {
	async findUserByEmail(email) {
		const query = "select id, email, created_at, updated_at from users where email = ?";
		const [rows] = await pool.query(query, [email]);
		return rows[0];
	}
}

module.exports = new UserModel();
