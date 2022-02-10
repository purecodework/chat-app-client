import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import useScreenWidth from "../../hooks/useScreenWidth";

/**
 * return
 * isLoading: loading state
 * chats: all chats record for logged In user
 */
const useChatPage = () => {
  const { isMobile } = useScreenWidth();
  const { auth } = useAuth();
  const { isLoading, sendRequest } = useFetch();

  const [chats, setChats] = useState([]);
  const [isChatSelected, setIsChatSelected] = useState(false);
  const [chatId, setChatId] = useState("");
  const [friendAccount, setFriendAccount] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [takerId, setTakerId] = useState("");

  // handle account input
  const enterFriendAccount = (e) => setFriendAccount((prev) => e.target.value);

  // Add a friend/ create a conversation
  const addFriend = useCallback(
    async (friendAccount) => {
      setIsAdded(false);
      let responseData;
      try {
        responseData = await sendRequest(
          process.env.REACT_APP_BASE_URL + "users/findUser/" + friendAccount,
          "GET"
        );
      } catch (e) {
        console.log(e);
      }
      const friendId = responseData.foundUser._id;

      let data;
      try {
        data = await sendRequest(
          process.env.REACT_APP_BASE_URL + "chats/",
          "POST",
          JSON.stringify({
            senderId: auth.userId,
            receiverId: friendId,
          })
        );

        if (data) {
          setFriendAccount("");
          setIsAdded(true);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [isAdded, sendRequest]
  );

  // get chatId and taker/receiverId when user select a chat
  const getChatId = (chatId, takerId) => {
    chatId ? setChatId(chatId) : setChatId("");
    setIsChatSelected(true);
    setTakerId(takerId);
  };

  // fetch all chats for the user
  useEffect(() => {
    const getChats = async () => {
      let responseData;

      try {
        responseData = await sendRequest(
          process.env.REACT_APP_BASE_URL + "users/" + auth.userId,
          "GET"
        );

        if (responseData) {
          setChats(responseData.chats);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getChats();
  }, [auth, isAdded, sendRequest, isChatSelected, addFriend]);

  return {
    setChats,
    takerId,
    friendAccount,
    enterFriendAccount,
    addFriend,
    setIsChatSelected,
    isChatSelected,
    chatId,
    getChatId,
    isMobile,
    chats,
    isLoading,
  };
};

export default useChatPage;
