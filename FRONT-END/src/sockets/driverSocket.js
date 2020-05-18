import storage from "lib/storage.js";

export const baseListening = (socket, roomName, groupId) => {
  socket.on("findDriver", () => {
    socket.emit("findedDriver", { roomName, groupId });
  });
  socket.on("requestLocationToDriver", ({ roomName, driverLogId, name }) => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("현재 브라우져에서는 위치정보기능을 기원하지 않습니다!");
      }
    };
    const showPosition = (position) => {
      const data = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        roomName,
      };
      socket.emit("receiveGPS", { data, driverLogId, name });
    };
    getLocation();
  });
  socket.on("driverLogSave", ({ driverLog }) => {
    storage.set("driverLog", driverLog);
  });
};

export const joinRoom = (socket, roomName) => {
  const driver = true;
  socket.emit("joinRoom", { roomName, driver });
};
export const sendDriverGPS = (socket, roomName, driverLogId, name) => {
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("현재 브라우져에서는 위치정보기능을 기원하지 않습니다!");
    }
  };
  const showPosition = (position) => {
    const driverId = storage.get("loggedInfo")._id;
    const data = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
      roomName,
    };
    socket.emit("receiveGPS", { data, driverId });
  };
  getLocation();
};
