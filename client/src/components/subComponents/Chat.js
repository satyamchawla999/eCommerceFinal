import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { getChatMessages,sendMessage } from "../../Utils/service";
import "../../assets/styles/chat.scss";

const Chat = (props) => {
  const { uid } = props;
  const [updateMessage, setUpdateMessage] = useState(false);
  const userData = useSelector((state) => state.users.userData);
  const [messages, setMessages] = useState([]);

  const chatMessage = useRef(null);

  useEffect(() => {
    // const abortController = new AbortController(); // Create an instance of AbortController

    console.log("useEffect")
    const getMessages = async () => {
      try {
        // const response = await axios.post(
        //   "http://localhost:8000/chat/get-messages",
        //   { uid: uid },
        //   {
        //     signal: abortController.signal, // Pass the signal to the request
        //   }
        // );

        const response = await getChatMessages(uid)

        if (response.status === 201) {
          console.log(response.data, "messages");
          setMessages(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getMessages();

    // return () => {
    // abortController.abort(); // Abort the request when the component unmounts
    // };
  }, [updateMessage]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = chatMessage.current.value;

    const sender = userData.role === "Admin" ? "Admin" : "Customer"

    if (message === "") {
      return;
    }

    try {
      const response = await sendMessage(uid,message,sender)

      if (response.status === 201) {
        console.log(response.data, "hello");
        setUpdateMessage(!updateMessage);
      }
    } catch (err) {
      console.log(err);
    }

    chatMessage.current.value = "";
  };

  return (
    <div className="chat">
      {userData.role === "Admin" ? <div className="chatHeader">

        <img
          className="img"
          src={props.data.image}
          alt="#"
        />
        <p>{props.data.name}</p>
      </div> : <div className="chatHeader">

        <img
          className="img"
          src="data:image/png;base64,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"
          alt="#"
        />
        <p>Snitch</p>
        <img src={require("../../assets/images/tick.png")} />
      </div>}


      <div className="chatRoom">
        {messages.map((message) => (
          <div className="messageContainer">
            {message.uid === userData.uid ? (
              <div className="rightMessage"><p>{message.message}</p></div>
            ) : (
              <div className="leftMessage"><p>{message.message}</p></div>
            )}
          </div>
        ))}
      </div>

      <form className="textBar">
        <input
          type="text"
          name="textbar"
          placeholder="type here ..."
          ref={chatMessage}
        />
        <button onClick={(e) => handleSend(e)}>
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default Chat;
