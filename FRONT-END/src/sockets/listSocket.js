export const baseEmiter = (socket, mylist) => {
  for (let i in mylist.groupList) {
    for (let k in mylist.groupList[i].courses) {
      socket.emit("joinRoom", { roomName: mylist.groupList[i].courses[k] });
      socket.emit("isDriverActive", {
        roomName: mylist.groupList[i].courses[k],
      });
      socket.emit("requestLocation", {
        roomName: mylist.groupList[i].courses[k],
      });
    }
  }
};
export const baseListening = (socket, ListActions) => {
  socket.on("driverActive", ({ groupId, roomName }) => {
    console.log("드라이버 있음");
    console.log(roomName, groupId, ListActions);
    ListActions.activeUpdate({ groupId, courseId: roomName });
  });
  socket.on("sendLocation", ({ locationName }) => {
    console.log("locations:::::::::::::::::::", locationName);
  });
};

function DriverListSoc(socket, ListActions, mylist) {}

export default DriverListSoc;
