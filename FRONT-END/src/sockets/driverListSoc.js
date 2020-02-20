export default function driverListSoc(socket, SocketActions) {
  // driverList 받아오기[API]
  SocketActions.setDriverList();

  // Active상태 갱신하기
  socket.on("sendNotifDriverActive", (data) => { // data = {driver, active}
    SocketActions.setDriverStatus(data);
  });
}
