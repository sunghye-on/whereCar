// dummy Data [ test용 ]
const driver1 = {
  id: 0,
  driverName: '홍길동1',
  routes: [
    { locationName: '1', Latitude: '0', longitude: '0' },
    { locationName: '2', Latitude: '0', longitude: '0' },
    { locationName: '3', Latitude: '0', longitude: '0' }
  ],
  currentLoc: { Latitude: '0', longitude: '0' }
};
const driver2 = {
  id: 1,
  driverName: '홍길동2',
  routes: [
    { locationName: '1', Latitude: '0', longitude: '0' },
    { locationName: '2', Latitude: '0', longitude: '0' },
    { locationName: '3', Latitude: '0', longitude: '0' }
  ],
  currentLoc: { Latitude: '0', longitude: '0' }
};


/* Server에서 event 를 emit 하고 on하는 파일 */
const events = require('./events');

// socket: 연결된 소켓, io: 전역소켓(Server Socket)
const socketController = (socket, io) => {
  console.log('❤  socket connecting success!!');

  // Driver가 활성화 되어있는지에 대하여 받는다.
  socket.on(events.driverActive, ({ driver, active }) => { // driver: 드라이버 유저정보 객체
    console.log(`${active ? '⭕ Driver connected' : '❌  Driver unconnected'}`);
    // 해당 Driver를 즐겨찾기한 User들에게(집단) 이를 알린다.
    socket.emit(events.sendNotifDriverActive, { driver, active }); // 보내는 Data는 딱히 없다.
  });

  // Driver로부터 위치정보를 받는다.
  socket.on(events.receiveLocation, ({ displayName, Latitude, longitude }) => {
    console.log(`received Driver[${displayName}] Location:: ${Latitude}, ${longitude} `);
    
    // 해당 Driver를 즐겨찾기한 User들에게(집단) 이를 알린다. [roomName = displayName]
    socket.emit(events.sendLocation, { displayName, Latitude, longitude });
  });

  /* test emit */
  socket.emit(events.sendNotifDriverActive, { driver: driver1, active: true });    
  socket.emit(events.sendNotifDriverActive, { driver: driver2, active: true });

  // refresh에 대한 이벤트
};
module.exports = socketController;