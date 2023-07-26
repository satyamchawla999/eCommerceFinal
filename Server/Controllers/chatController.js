const Chat = require("../Model/chat");
const User = require("../Model/users");

module.exports.getMessages = async (req, res) => {
    console.log(req.body, "hello")
    const { uid } = req.body;

    try {
        let admin = await User.findOne({ role: "Admin" });
        let user = await User.findOne({ uid: uid });
        let chatId = admin.uid + user.uid;

        let chatroom = await Chat.findOne({ chatId: chatId });

        if (!chatroom) {
            const data = {
                chatId: chatId,
                imgUrl:user.imgUrl,
                USERID:user.email !== "NA" ? user.email : user.phone,
                cName: user.name,
                aName: admin.name,
                aUid: admin.uid,
                cUid: user.uid,
            }
            chatroom = await Chat.create(data);
            console.log("chatroom created",chatroom)
        }
        
        return res.status(201).send(chatroom.messages);


    } catch (err) {
        console.error(err);
        res.statusMessage = "An error occurred.";
        return res.status(500).end();
    }
}

module.exports.sendMessage = async (req, res) => {
    const { uid, sender } = req.body;
    console.log("hello admin")

    try {
        let admin = await User.findOne({ role: "Admin" });
        let user = await User.findOne({ uid: uid });
        let chatId = admin.uid + user.uid;

        console.log("admin",);
        console.log("user",);
        console.log("chatId", chatId)

        let chatroom = await Chat.findOne({ chatId: chatId });

        if (chatroom) {
            console.log("hello chat room")
            if (sender === "Admin") {
                req.body.uid = admin.uid;
            }
            chatroom?.messages.push(req.body);
            chatroom.markModified("messages");
            chatroom = await chatroom.save()
            console.log(chatroom.messages)
            return res.status(201).send("message send");
        } else {
            return res.status(204).send("order placed");
        }


    } catch (err) {
        console.error(err);
        res.statusMessage = "An error occurred.";
        return res.status(500).end();
    }
}

module.exports.getChatUsers = async (req, res) => {

    try {
        let chatroom = await Chat.find({});
        console.log(chatroom, "admin chat")

        if (chatroom) {
            return res.status(201).send(chatroom);
        } else {
            return res.status(204).send("order placed");
        }


    } catch (err) {
        console.error(err);
        res.statusMessage = "An error occurred.";
        return res.status(500).end();
    }
}

