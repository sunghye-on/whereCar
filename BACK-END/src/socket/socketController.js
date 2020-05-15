/* Server에서 event 를 emit 하고 on하는 파일 */
const events = require("./events");
const Station = require("db/models/Station");
const Course = require("db/models/Course");
const CourseLog = require("db/models/CourseLog");
// socket: 연결된 소켓, io: 전역소켓(Server Socket)
const socketController = (socket, io) => {
  console.log("❤  socket connecting success!!");
  // Driver가 활성화 되어있는지에 대하여 받는다.
  socket.on(events.driverActive, ({ driver, active }) => {
    // driver: 드라이버 유저정보 객체
    // 해당 Driver를 즐겨찾기한 User들에게(집단) 이를 알린다.
    socket.emit(events.sendNotifDriverActive, { driver, active }); // 보내는 Data는 딱히 없다.
  });

  socket.on(events.joinRoom, async ({ roomName, driver }) => {
    console.log(driver);
    if (driver) {
      const courseLog = await CourseLog.register({ courseId: roomName });
      console.log(courseLog);
    }

    socket.join(roomName, function () {
      console.log("enter Romm", roomName);
    });
  });
  /* 
  socket Listening to user  
  */
  socket.on(events.isDriverActive, ({ roomName }) => {
    io.to(roomName).emit(events.findDriver);
  });
  socket.on(events.findedDriver, ({ roomName, groupId }) => {
    io.to(roomName).emit(events.driverActive, { roomName, groupId });
  });
  // refresh에 대한 이벤트
  socket.on(events.requestLocation, ({ roomName }) => {
    io.to(roomName).emit(events.requestLocationToDriver, { roomName });
    console.log("send to ", roomName);
  });
  socket.on(events.receiveGPS, async (data) => {
    // console.log(data);
    /* 계산 과정이 들어갈곳 */
    const locationName = await Station.getNearStation({
      longitude: data.longitude,
      latitude: data.latitude,
    });
    // console.log(locationName);
    // // 나중에 계산된 내용을 locationName에 넣어 보내주자
    io.to(data.roomName).emit(events.sendLocation, { locationName });
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
