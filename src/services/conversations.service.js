const conversationModel = require("@/models/conversation.model");

class Conversation {
	async createChat(name, type, createdBy) {
		const result = await conversationModel.createChat(name, type, createdBy);
	}
}

module.exports = new Conversation();
