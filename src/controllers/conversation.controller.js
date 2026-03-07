const conversationsService = require("@/services/conversations.service");

const createNew = async (req, res) => {
	const { name, participant_ids } = req.body;
	const result = await conversationsService.createChat(req.auth.user, name, participant_ids);

	return res.success(result);
};

const addUser = async (req, res) => {
	const userId = req.body.user_id;
	if (!userId) {
		return res.error("User ID is required");
	}

	const conversationId = req.params.id;
	if (!conversationId) {
		return res.error("Conversation ID is required");
	}

	const [error, data] = await conversationsService.addUser(userId, conversationId);

	if (error) {
		return res.error(error.message || "Failed to add user");
	}

	if (error) res.error(error);

	return res.success(data);
};

const sendNewMessage = async (req, res) => {
	const content = req.body.content;
	const userId = req.auth.user.id;
	if (!userId) {
		return res.error("User ID is required");
	}

	const conversationId = req.params.id;
	if (!conversationId) {
		return res.error("Conversation ID is required");
	}

	const result = await conversationsService.sendNewMessage(conversationId, userId, content.trim());
	res.success(result);
};

const fetchUserConversations = async (req, res) => {
	const user = req.auth.user;
	const result = await conversationsService.fetchUserConversations(user.id);
	res.success(result);
};

const fetchAllMessages = async (req, res) => {
	const conversationId = req.params.id;
	if (!conversationId) {
		return res.error("Conversation ID is required");
	}

	const result = await conversationsService.fetchAllMessages(conversationId);
	res.success(result);
};

module.exports = {
	createNew,
	fetchUserConversations,
	fetchAllMessages,
	addUser,
	sendNewMessage,
};
