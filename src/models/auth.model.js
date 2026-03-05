const pool = require("@/config/database");

class AuthModel {
	async register(email, password) {
		const query = "insert into users (email, password) values (?, ?)";
		const [rows] = await pool.query(query, [email, password]);
		const user = await this.findUserById(rows.insertId);
		return user;
	}

	async findUserById(id) {
		const query = `select id, email, created_at, updated_at from users where id = ?`;
		const [rows] = await pool.query(query, [id]);
		return rows[0];
	}
}

module.exports = new AuthModel();
