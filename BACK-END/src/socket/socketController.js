/* Server에서 event 를 emit 하고 on하는 파일 */
const events = require("./events");
const Station = require("db/models/Station");
const Course = require("db/models/Course");
const CourseLog = require("db/models/CourseLog");
const DriverLog = require("db/models/DriverLog");
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
      CourseLog.register({ courseId: roomName });
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
  socket.on(events.requestLocation, ({ roomName, driverLogId, name }) => {
    io.to(roomName).emit(events.requestLocationToDriver, {
      roomName,
      driverLogId,
      name,
    });
    console.log("send to ", roomName, driverLogId, name);
  });
  socket.on(
    events.receiveGPS,
    async ({ data, driverId, driverLogId, name }) => {
      console.log("asdasdawdasd", driverLogId, "and", name);

      const course = await Course.findById({ _id: data.roomName });
      const locations = await Station.getNearStation({
        longitude: data.longitude,
        latitude: data.latitude,
        courseId: data.roomName,
      });
      // const result = await locations.findByCourseId({
      //   courseId: data.roomName,
      // });

      console.log("hhhhhhhhhhhhhhhhhhhhhhhh", locations);

      /* 계산 과정이 들어갈곳 */
      let driverLog = "";
      console.log("course::::::", course);
      const locationName = locations;
      // DriverLog 최초생성
      if (driverId) {
        /* 해야할 일 : location만들기 */
        const firstStation = course.stations[0];
        const name = firstStation.get("stationName");

        const location = {
          longitude: firstStation.get("longitude"),
          latitude: firstStation.get("latitude"),
        };
        // console.log("location::::::::", firstStation);
        driverLog = DriverLog.register({ driverId, name, location });
        io.to(data.roomName).emit(events.driverLogSave, { driverLog });
        io.to(data.roomName).emit(events.sendLocation, {
          locationName,
          driverLog,
        });
      }
      // 드라이버 로그가 있을때
      if (driverLogId) {
        console.log("location:::::", locations);
      }
      /* DriverLog 업데이트: 로컬저장소에서 DriverLog _id를 가져다 활용 */
      /* DriverLog를 갱신하는 조건: DriverLog 아이디가 있다면...*/
      // DriverLogId로 DriverLog 불러오기
      // 불러온 정보의 name과 가장가까운 정거장 Name을 비교
      // 같다면 locationLog만 업데이트, 아니라면 새로운 DriverLog 생성후 Client에게 새로운 DriverLog까지 전달

      // console.log(locationName);
      // // 나중에 계산된 내용을 locationName에 넣어 보내주자 + DriverLog까지
      console.log("log_______________:", driverLog);
      io.to(data.roomName).emit(events.sendLocation, {
        locationName,
      });
    }
  );
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
