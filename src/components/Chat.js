import timeConvert from "../utilities/time-convert";

const Chat = (props) => {
  return (
    <div
      className={`w-5/6 h-20 text-center my-2 rounded-lg bg-slate-50 flex items-center justify-around`}
      onClick={() => props.callBack(props.chatId, props.takerId)}
    >
      <div className="w-3/5">
        <p className="text-left text-lg font-semiBold  ">{props.receiver}</p>
        <p className="text-left text-md truncate text-slate-500">
          {props.latestMessage}
        </p>
      </div>
      <div className="text-sm text-slate-500 flex flex-col items-end">
        <div
          className={`w-2.5 h-2.5 mb-2 rounded-full bg-rose-400 ${
            props.isNewMessage ? "block" : "hidden"
          }  `}
        />

        {timeConvert(props.latestUpdate)}
      </div>
    </div>
  );
};

export default Chat;
