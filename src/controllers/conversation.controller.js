const conversationsService = require("@/services/conversations.service");

const fetchCurrentUser = () => {};

const fetchAllMessages = () => {};

const createNew = async (req, res) => {
	const { name, type } = req.body;
	const result = await conversationsService.createChat(name, type);
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
