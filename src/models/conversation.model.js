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

	async sendNewMessage(messageData) {
		const { conversationId, userId, content } = messageData;

		const query = "insert into messages (conversation_id, sender_id, content) values (?, ?, ?)";
		const [rows] = await pool.query(query, [conversationId, userId, content]);
		return rows.affectedRows;
	}

	async fetchConversationById(id) {
		const [rows] = await pool.query("select * from conversations where id = ?", [id]);
		return rows[0];
	}

	async fetchUserConversations(id) {
		const [result] = await pool.query("select conversation_id from conversation_participants where user_id = ?", [
			id,
		]);
		const conversationIds = result.map(({ conversation_id }) => conversation_id);
		const [rows] = await pool.query(`select * from conversations where id in (?)`, [conversationIds]);
		return rows;
	}

	async fetchAllMessages(id) {
		const [rows] = await pool.query("select * from messages where conversation_id = ? order by created_at desc", [
			id,
		]);
		return rows;
	}

	async isUserInConversation(userId, conversationId) {
		const [rows] = await pool.query(
			"select count(*) as count from conversation_participants where user_id = ? and conversation_id = ?",
			[userId, conversationId],
		);

		return rows[0].count > 0;
	}
}

module.exports = new ConversationModel();
