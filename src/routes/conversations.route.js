const express = require("express");
const router = express();

const conversationsController = require("@/controllers/conversation.controller");

// GET
router.get("/", conversationsController.fetchCurrentUser);
router.get("/:id/messages", conversationsController.fetchAllMessages);

// POST
router.post("/", conversationsController.createNew);
router.post("/:id/participants", conversationsController.addUser);
router.post("/:id/messages", conversationsController.sendNewMessage);

module.exports = router;
