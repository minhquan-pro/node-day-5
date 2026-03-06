const conversationModel = require("@/models/conversation.model");

class Conversation {
	async createChat(user, name, participantIds) {
		const createdBy = user.email;

		let type = "direct";

		if (participantIds.length > 2) {
			type = "group";
		}

		const result = await conversationModel.createChat(createdBy, name, type);

		console.log(result.insertId);

		await this.addParticipant(result?.insertId, participantIds);

		return result;
	}

	async addParticipant(conversationId, participantIds) {
		const values = participantIds.map((id) => [conversationId, id]);
		await conversationModel.addParticipant(values);
	}
}

module.exports = new Conversation();
