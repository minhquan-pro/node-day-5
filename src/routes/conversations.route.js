const express = require("express");
const router = express();

const conversationsController = require("@/controllers/conversation.controller");
const authRequired = require("@/middlewares/authRequired");

// GET
router.get("/", authRequired, conversationsController.fetchUserConversations);
router.get("/:id/messages", conversationsController.fetchAllMessages);

// POST
router.post("/", authRequired, conversationsController.createNew);
router.post("/:id/participants", conversationsController.addUser);
router.post("/:id/messages", conversationsController.sendNewMessage);

module.exports = router;
