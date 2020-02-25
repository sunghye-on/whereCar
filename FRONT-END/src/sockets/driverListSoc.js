export default function driverListSoc(socket, SocketActions) {
  // driverList 받아오기 [API]
  SocketActions.setDriverList();

  // 초기상태 만들기 with DriverActive상태도 받아오기.

  // Active상태 갱신하기 [Socket]
  socket.on("sendNotifDriverActive", (data) => { // data = {driver, active}
    SocketActions.setDriverStatus(data);
  });
}
