import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
// import useScreenWidth from "../../hooks/useScreenWidth";
import { useCallback } from "react";
import { socket } from "../../utilities/socker";

/**
 * sendMessage():send a message to a chat based on ChatId and Sender Id
 * getMessages(): fetch all messages for chatId
 * {chatId}
 * messages input...
 */
const useSingleChat = (chatId, takerId) => {
  const { auth } = useAuth();
  const { sendRequest } = useFetch();

  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const userId = auth.userId;

  // socket IO
  useEffect(() => {
    if (!socketConnected) {
      socket.once("connection", () => {
        setSocketConnected(true);
      });

      socket.emit("setup", userId);
      socket.emit("join chat", chatId);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    socket.on("receive message", ({ chatId, sender, content }) => {
      if (content) {
        let newMessage = {
          _id: null,
          chatId: chatId,
          sender: sender,
          content: content,
          createdAt: null,
          updatedAt: null,
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    });
    return () => socket.off("receive message");
  }, [messages]);

  // send message
  const sendMessage = useCallback(
    async (content) => {
      let responseData;
      try {
        // io send message
        socket.off("send message");
        responseData = await sendRequest(
          process.env.REACT_APP_BASE_URL + "messages/",
          "POST",
          JSON.stringify({
            chatId,
            sender: auth.userId,
            content: content,
          })
        );
        socket.emit("send message", { chatId, userId, takerId, content });
        setMessageContent("");
        setIsSent(!isSent);
      } catch (e) {
        console.log(e);
      }
    },
    [sendRequest, isSent]
  );

  // get messages for a chat
  useEffect(() => {
    const getMessages = async () => {
      let responseData;

      try {
        responseData = await sendRequest(
          process.env.REACT_APP_BASE_URL + "messages/" + chatId,
          "GET"
        );

        if (responseData) {
          setMessages(responseData);
          // socket join room
        }
      } catch (e) {
        console.log(e);
      }
    };
    getMessages();
  }, [chatId, sendMessage]);

  //handle enter message
  const enterMessage = (e) => setMessageContent((prev) => e.target.value);

  return {
    chatId,
    messages,
    messageContent,
    enterMessage,
    sendMessage,
  };
};

export default useSingleChat;
