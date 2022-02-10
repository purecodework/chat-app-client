import io from "socket.io-client";

const socket = io("https://mern-chat-app-server.herokuapp.com/");

export { socket };
