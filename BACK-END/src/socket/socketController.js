// dummy Data [ test용 ]
const driver1 = {
  id: 0,
  driverName: "홍길동1",
  routes: [
    { locationName: "1", Latitude: "0", longitude: "0" },
    { locationName: "2", Latitude: "0", longitude: "0" },
    { locationName: "3", Latitude: "0", longitude: "0" },
  ],
  currentLoc: { Latitude: "0", longitude: "0" },
};
const driver2 = {
  id: 1,
  driverName: "홍길동2",
  routes: [
    { locationName: "1", Latitude: "0", longitude: "0" },
    { locationName: "2", Latitude: "0", longitude: "0" },
    { locationName: "3", Latitude: "0", longitude: "0" },
  ],
  currentLoc: { Latitude: "0", longitude: "0" },
};
testRoom = "5eb39a64fbd20d039400629f";
/* Server에서 event 를 emit 하고 on하는 파일 */
const events = require("./events");
const Station = require("db/models/Station");
const Course = require("db/models/Course");
// socket: 연결된 소켓, io: 전역소켓(Server Socket)
const socketController = (socket, io) => {
  console.log("❤  socket connecting success!!");
  // Driver가 활성화 되어있는지에 대하여 받는다.
  socket.on(events.driverActive, ({ driver, active }) => {
    // driver: 드라이버 유저정보 객체
    // console.log(`${active ? '⭕ Driver connected' : '❌  Driver unconnected'}`);
    // 해당 Driver를 즐겨찾기한 User들에게(집단) 이를 알린다.
    socket.emit(events.sendNotifDriverActive, { driver, active }); // 보내는 Data는 딱히 없다.
  });

  socket.on(events.joinRoom, ({ roomName }) => {
    socket.join(roomName, function () {
      console.log("enter Romm", roomName);
    });
  });
  /* 
  socket Listening to user  
  */
  socket.on(events.isDriverActive, ({ roomName }) => {
    console.log("sock::::::::::::::::::::::", socket.adapter.rooms);
    console.log("roomname::::::::::::", roomName);
    io.to(roomName).emit(events.findDriver);
  });
  socket.on(events.findedDriver, ({ roomName }) => {
    io.to(roomName).emit(events.driverActive, { roomName });
  });

  socket.emit(events.sendNotifDriverActive, { driver: driver1, active: true });
  socket.emit(events.sendNotifDriverActive, { driver: driver2, active: true });

  // refresh에 대한 이벤트
  socket.on(events.requestLocation, ({ roomName, driver }) => {
    /* 드라이버라면 
    io.to(roomName).emit(events.reciveLocation, { roomName });
    를 실행 하여 위치를 알아 온다
    */
    /* 유저라면 
   아무것도 안함
   */
    driver ? io.to(roomName).emit(events.reciveLocation) : null;
    console.log("send to ", roomName);
  });
  socket.on(events.receiveGPS, async (data) => {
    console.log(data);
    /* 계산 과정이 들어갈곳 */
    // const locationName = await Station.getNearStation({
    //   longitude: data.longitude,
    //   latitude: data.latitude,
    // });
    // console.log(locationName);
    // // 나중에 계산된 내용을 locationName에 넣어 보내주자
    // io.to(data.roomName).emit(events.sendLocation, { locationName });
  });
  socket.on(events.courseActive, async ({ courseId }) => {
    console.log(courseId);
    const course = await Course.findById({ _id: courseId });

    console.log(courseName.courseName);
    io.sockets.emit(events.notifiCourseActive, {
      courseName: course.courseName,
    });
  });
};
module.exports = socketController;
