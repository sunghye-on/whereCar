export const baseListening = (socket, roomName) => {
  socket.on("findDriver", () => {
    console.log("findDrivers::::");
    socket.emit("findedDriver", { roomName });
  });
};

export const joinRoom = (socket, roomName) => {
  socket.emit("joinRoom", { roomName });
};
