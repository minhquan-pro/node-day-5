const conversationsService = require("@/services/conversations.service");

const fetchCurrentUser = () => {};

const fetchAllMessages = () => {};

const createNew = async (req, res) => {
	const { name, type, created_by } = req.body;
	const result = await conversationsService.createChat(name, type, created_by);
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
