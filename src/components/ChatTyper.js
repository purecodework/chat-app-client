import { FiSend } from "react-icons/fi";

const ChatTyper = (props) => {
  return (
    <div className="text-center w-full h-8 flex bg-white border">
      <input
        className="p-1 grow-[2] bg-white rounded-lg rounded-lg focus:outline-none"
        onChange={props.enterMessage}
        value={props.content}
        onKeyDown={(e) => (e.key === "Enter" ? props.onSubmit() : null)}
      />
      <button
        className="flex justify-center items-center w-10 rounded-lg p-1 bg-blue-500 hover:bg-blue-400 text-center text-white text-md"
        onClick={props.onSubmit}
      >
        <FiSend />
      </button>
    </div>
  );
};

export default ChatTyper;
