import ChatsList from "../ChatsList/ChatsList";
import useChatPage from "./useChatPage";
import SingleChat from "../SingleChat/SingleChat";
import useScreenWidth from "../../hooks/useScreenWidth";

const ChatPage = () => {
  const { setIsChatSelected, getChatId, isChatSelected, chatId, takerId } =
    useChatPage();
  const { isMobile } = useScreenWidth();

  return (
    <div className="flex h-full lg:rounded-lg shadow-lg w-full ">
      <div className="w-full rounded-l-lg md:block md:w-2/5 bg-gray-50 min-w-sm">
        {isMobile ? (
          isChatSelected ? (
            <SingleChat
              chatId={chatId}
              callBack={() => setIsChatSelected(false)}
              takerId={takerId}
            />
          ) : (
            <ChatsList callBack={getChatId} />
          )
        ) : (
          <ChatsList callBack={getChatId} />
        )}
      </div>
      <div className="hidden md:block md:w-3/5 lg:w-5/6 bg-white">
        {isChatSelected ? (
          <SingleChat
            chatId={chatId}
            callBack={() => setIsChatSelected(false)}
            takerId={takerId}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ChatPage;
