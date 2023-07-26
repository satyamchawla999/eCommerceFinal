const express = require("express");
const router = express.Router();

const chatController = require("../Controllers/chatController");

router.post('/get-messages',chatController.getMessages);
router.post('/send-message',chatController.sendMessage);
router.get('/get-chat-users',chatController.getChatUsers);
// router.post('/change-status',orderController.changeStatus);
// router.post('/cancel-order',orderController.cancelOrder);




module.exports=router;