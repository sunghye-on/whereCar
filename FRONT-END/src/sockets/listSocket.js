import { colors } from "@material-ui/core";

export const enterRooms = (socket, mylist) => {
  for (let i in mylist.groupList) {
    for (let k in mylist.groupList[i].courses) {
      socket.emit("joinRoom", { roomName: mylist.groupList[i].courses[k] });
      socket.emit("isDriverActive", {
        roomName: mylist.groupList[i].courses[k],
      });
    }
  }
};
export const baseListening = (socket) => {
  socket.on("driverActive", ({ roomName }) => {
    console.log("드라이버 있음");
    console.log(roomName);
  });
  socket.on("sendLocation");
};
function DriverListSoc(socket, ListActions, mylist) {}

export default DriverListSoc;
