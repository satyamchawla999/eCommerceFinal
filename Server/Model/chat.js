const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chatId: {
        type: String,
        required: true,
    },
    imgUrl: [{
      type: String,
      required: true,
    }],
    cName: {
      type: String,
      required: true,
    },
    aName: {
      type: String,
      required: true,
    },
    aUid: {
      type: String,
      required: true,
    },
    cUid: {
      type: String,
      required: true,
    },
    USERID: {
      type: String,
      required: true,
    },
    messages: [{type:Object}]
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
