import Chat from "../../components/Chat";
import useChatPage from "../ChatPage/useChatPage";
import { useAuth } from "../../context/AuthContext";
import { socket } from "../../utilities/socker";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect } from "react";

const ChatsList = (props) => {
  const { chats, friendAccount, enterFriendAccount, addFriend, setChats } =
    useChatPage();
  const { auth } = useAuth();

  useEffect(() => {
    socket.once("connection", () => {});

    socket.emit("setup", auth.userId);
    socket.on("receive message", ({ chatId, sender, content }) => {
      if (chats && content) {
        let newChats = [...chats];

        newChats.forEach((chat) =>
          chat._id === chatId
            ? ((chat.latestMessage = content), (chat.isNewMessage = true))
            : ((chat.latestMessage = chat.latestMessage),
              (chat.isNewMessage = false))
        );

        setChats(newChats);
      }
    });
  }, [chats]);

  return (
    <div className="h-full flex flex-col items-center bg-slate-100">
      <div className="text-center my-3 w-4/5 h-8 flex  bg-white rounded-lg">
        <input
          onChange={enterFriendAccount}
          className="p-1 grow-[2] bg-white rounded-lg rounded-lg focus:outline-none"
          type="search"
          value={friendAccount}
          onKeyDown={(e) =>
            e.key === "Enter" ? () => addFriend(friendAccount) : null
          }
        />
        <button
          className="flex item-center justify-center rounded-lg p-3 bg-blue-500 hover:bg-blue-400 text-white text-xs"
          onClick={() => addFriend(friendAccount)}
        >
          <AiOutlineSearch />
        </button>
      </div>

      {chats ? (
        chats.map((c) => (
          <Chat
            key={c._id}
            chatId={c._id}
            takerId={c.users.filter((u) => u._id !== auth.userId)[0]._id}
            receiver={c.users.filter((u) => u._id !== auth.userId)[0].account}
            callBack={props.callBack}
            latestMessage={c.latestMessage}
            latestUpdate={c.updatedAt}
            isNewMessage={c.isNewMessage}
          />
        ))
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default ChatsList;
