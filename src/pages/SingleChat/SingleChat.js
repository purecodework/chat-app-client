import Message from "../../components/Message";
import { useAuth } from "../../context/AuthContext";
import ChatTyper from "../../components/ChatTyper";
import useSingleChat from "./useSingleChat";
import { BiArrowBack } from "react-icons/bi";
import ScrollProvider from "../../components/ScrollProvider";

const SingleChat = (props) => {
  const { messageContent, messages, enterMessage, sendMessage } = useSingleChat(
    props.chatId,
    props.takerId
  );
  const { auth } = useAuth();

  return (
    <div className="h-full">
      <button className="h-1 p-5" onClick={props.callBack}>
        <BiArrowBack size="1.5em" />
      </button>
      <div className="overflow-scroll h-9/10 p-5">
        {messages.map((m, index) => (
          <Message key={index} isSender={auth.userId === m.sender}>
            {m.content}
          </Message>
        ))}
        <ScrollProvider />
      </div>
      <ChatTyper
        content={messageContent}
        onSubmit={() => sendMessage(messageContent)}
        enterMessage={enterMessage}
      />
    </div>
  );
};

export default SingleChat;
