export const baseListening = (socket, roomName) => {
  socket.on("findDriver", () => {
    socket.emit("findedDriver", { roomName });
  });
};

export const joinRoom = (socket, roomName) => {
  socket.emit("joinRoom", { roomName });
};
