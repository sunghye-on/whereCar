const events = {
  driverActive: 'driverActive', // Driver가 활성정보를 받음
  sendNotifDriverActive: 'sendNotifDriverActive', // Driver의 활성상태를 유저들에게 알림

  receiveLocation: 'receiveLocation', // Driver로 부터 전송된 위치좌표
  sendLocation: 'sendLocation', // Server로부터 전송되는 Driver의 위치좌표
  sendArriveTime: 'sendArriveTime', // Server로부터 전송되는 Driver가 지정된 위치에 도착까지 걸리는 시간

  receiveNotification: 'receiveNotification', // Server로부터 받는 Notification
  sendNotification: 'sendNotification' // Server로부터 전송되는 Notification
};

module.exports = events; 