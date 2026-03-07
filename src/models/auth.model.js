const pool = require("@/config/database");

class AuthModel {
	async register(email, password) {
		const query = "insert into users (email, password) values (?, ?)";
		const [rows] = await pool.query(query, [email, password]);
		const user = await this.findUserById(rows.insertId);
		return user;
	}

	async login(email, password) {
		const query = "select * from user where email = ? and password = ?";
		const [rows] = await pool.query(query, [email, password]);
		return rows;
	}

	async findUserByEmail(email) {
		const query = `select id, password, email, created_at, updated_at from users where email = ?`;
		const [rows] = await pool.query(query, [email]);
		return rows[0];
	}

	async findUserById(ids) {
		const query = `select id, email, created_at, updated_at from users where id in (?)`;
		const [rows] = await pool.query(query, [ids]);
		return rows;
	}
}

module.exports = new AuthModel();
