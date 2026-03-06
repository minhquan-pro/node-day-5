const pool = require("@/config/database");

class ConversationModel {
	async createChat(name, type, createdBy) {
		const query = "insert into conversations (name, type, created_by) values (?, ?, ?)";
		const [rows] = await pool.query(query, [name, type, createdBy]);
		console.log(rows);
	}
}

module.exports = new ConversationModel();
