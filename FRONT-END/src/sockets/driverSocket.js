export const baseListening = (socket, roomName) => {
  socket.on("findDriver", () => {
    socket.emit("findedDriver", { roomName });
  });
  socket.on("requestLocationToDriver", ({ roomName }) => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("현재 브라우져에서는 위치정보기능을 기원하지 않습니다!");
      }
    };
    const showPosition = (position) => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      socket.emit("receiveGPS", { longitude, latitude, roomName });
    };
    getLocation();
  });
};

export const joinRoom = (socket, roomName) => {
  socket.emit("joinRoom", { roomName });
};
export const sendDriverGPS = (socket, roomName) => {
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("현재 브라우져에서는 위치정보기능을 기원하지 않습니다!");
    }
  };
  const showPosition = (position) => {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    socket.emit("receiveGPS", { longitude, latitude, roomName });
  };
  getLocation();
};
