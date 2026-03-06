const pool = require("@/config/database");

class ConversationModel {
	async createChat(createdBy, name, type) {
		const query = "insert into conversations (created_by, name, type) values (?, ?, ?)";
		const [rows] = await pool.query(query, [createdBy, name, type]);
		return rows;
	}

	async addParticipant(values) {
		const placeholders = values.map((value) => "(?, ?)").join(", ");
		const flattenedValues = values.flat();

		const query = `insert into conversation_participants (conversation_id, user_id) values ${placeholders}`;
		const [rows] = await pool.query(query, flattenedValues);

		return rows;
	}

	async fetchUserConversations(id) {
		const [result] = await pool.query("select conversation_id from conversation_participants where user_id = ?", [
			id,
		]);
		const conversationIds = result.map(({ conversation_id }) => conversation_id);
		const [rows] = await pool.query(`select * from conversations where id in (?)`, [conversationIds]);
		return rows;
	}
}

module.exports = new ConversationModel();
