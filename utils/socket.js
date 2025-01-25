import { Server } from "socket.io";
let io;

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("join-expedition", (expeditionId) => {
      socket.join(expeditionId);
      console.log(`Client joined expedition room: ${expeditionId}`);
    });

    socket.on("leave-expedition", (expeditionId) => {
      socket.leave(expeditionId);
      console.log(`Client left expedition room: ${expeditionId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};

export const initIO = (socketIO) => {
  io = socketIO;
};

export const getIO = () => {
  if (!global.io) {
    throw new Error("Socket.io not initialized");
  }
  return global.io;
};
