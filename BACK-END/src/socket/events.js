const events = {
  receiveLocation: 'receiveLocation', // Driver로 부터 전송된 위치좌표
  sendLocation: 'sendLocation', // Server로부터 전송되는 Driver의 위치좌표
  sendArriveTime: 'sendArriveTime', // Server로부터 전송되는 Driver가 지정된 위치에 도착까지 걸리는 시간

  receiveNotification: 'receiveNotification', // Server로부터 받는 Notification
  sendNotification: 'sendNotification' // Server로부터 전송되는 Notification
};

export default events; 