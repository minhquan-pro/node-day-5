const conversationModel = require("@/models/conversation.model");

class Conversation {
	async createChat(user, name, participantIds) {
		const createdBy = user.email;

		let type = "direct";

		if (participantIds.length > 2) {
			type = "group";
		}

		const result = await conversationModel.createChat(createdBy, name, type);
		await this.addParticipant(result?.insertId, participantIds);

		return result;
	}

	async addParticipant(conversationId, participantIds) {
		const values = participantIds.map((id) => [conversationId, id]);
		await conversationModel.addParticipant(values);
	}

	async fetchUserConversations(id) {
		const result = await conversationModel.fetchUserConversations(id);
		return result;
	}
}

module.exports = new Conversation();
