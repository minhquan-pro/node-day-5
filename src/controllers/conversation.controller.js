const conversationsService = require("@/services/conversations.service");

const createNew = async (req, res) => {
	const { name, participant_ids } = req.body;
	const result = await conversationsService.createChat(req.auth.user, name, participant_ids);

	res.success(result);
};

const fetchUserConversations = async (req, res) => {
	const user = req.auth.user;
	const result = await conversationsService.fetchUserConversations(user.id);
	res.success(result);
};

const fetchAllMessages = () => {};

const addUser = () => {};
const sendNewMessage = () => {};

module.exports = {
	createNew,
	fetchUserConversations,
	fetchAllMessages,
	addUser,
	sendNewMessage,
};
