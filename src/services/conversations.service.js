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

	async addUser(userId, conversationId) {
		const conversation = await conversationModel.fetchConversationById(conversationId);
		if (!conversation) {
			return [new Error("Conversation not found"), null];
		}

		if (conversation.type === "direct") {
			return [new Error("Cannot add users to direct conversation"), null];
		}

		const isInConversation = await conversationModel.isUserInConversation(userId, conversationId);
		if (isInConversation) {
			return [new Error("User already in conversation"), null];
		}

		await conversationModel.addParticipant([[conversationId, userId]]);
		return [
			null,
			{
				message: "User added successfully",
				conversationId,
				userId,
			},
		];
	}

	async sendNewMessage(conversationId, userId, content) {
		const conversation = await conversationModel.fetchConversationById(conversationId);
		if (!conversation) throw new Error("Conversation not found");

		const isInConversation = await conversationModel.isUserInConversation(userId, conversationId);
		if (!isInConversation) throw new Error("User is not in this conversation");

		const messageData = {
			conversationId,
			userId,
			content: content.trim(),
		};

		await conversationModel.sendNewMessage(messageData);

		return {
			...messageData,
			status: "sent",
		};
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
