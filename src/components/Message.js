const Message = ({ time, isSender, children }) => {
  return (
    <div className={` flex ${isSender ? "flex-row-reverse" : " flex-row"}`}>
      <div
        className={`w-auto inline-block m-2 px-4 py-2 rounded-lg ${
          isSender
            ? "bg-lime-200 rounded-br-none"
            : "bg-slate-300 rounded-bl-none"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Message;
