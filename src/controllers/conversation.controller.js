const conversationsService = require("@/services/conversations.service");

const fetchCurrentUser = () => {};

const fetchAllMessages = () => {};

const createNew = async (req, res) => {
	const { name, participant_ids } = req.body;
	const result = await conversationsService.createChat(req.auth.user, name, participant_ids);

	res.success(result);
};

const addUser = () => {};
const sendNewMessage = () => {};

module.exports = {
	createNew,
	fetchCurrentUser,
	fetchAllMessages,
	addUser,
	sendNewMessage,
};
