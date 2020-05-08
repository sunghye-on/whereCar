import storage from "lib/storage";
function DriverListSoc(socket, ListActions) {
  // driverList 받아오기 [API]
  // SocketActions.setDriverList();

  // 초기상태 만들기 with DriverActive상태도 받아오기.

  // Active상태 갱신하기 [Socket]
  socket.on("sendNotifDriverActive", (data) => {
    // data = {driver, active}
    // SocketActions.setDriverStatus(data);
  });
  /* 일반 유저가 방에 입장하기 위함*/
  const a = storage.get("myList");
  const data = storage.get("myData");
  console.log("data==============", data);
  let roomNames = [];
  console.log("AllgroupListData:::::", a.mylist.groupList);

  for (let i in a.mylist.groupList) {
    console.log("GroupData:::::", a.mylist.groupList[i]);
    for (let k in a.mylist.groupList[i].courses) {
      console.log("CourseData:::::", a.mylist.groupList[i].courses[k]);
      roomNames.push(a.mylist.groupList[i].courses[k]);
    }
  }
  console.log("%cAllRooms", "color: yellow; font-size:40px", roomNames);
  for (let i in roomNames) {
    let roomName = roomNames[i];
    socket.emit("joinRoom", { roomName });
    socket.emit("requestLocation", { roomName });
  }

  socket.on("receiveLocation", ({ roomName }) => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("현재 브라우져에서는 위치정보기능을 기원하지 않습니다!");
      }
    };
    const showPosition = (position) => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      socket.emit("receiveGPS", { longitude, latitude, roomName });
    };
    getLocation();
    console.log(roomName);
  });

  socket.on("sendLocation", (data) => {
    console.log(data);
  });
}

export default DriverListSoc;

/*
  1. 운전자가 방에 입장하여 름을 생성한다.
    1.1 운전자는 운전을 시작하면 active상태를 모든 유저에게 브로드캐스팅한다.
    1.2 active상태를 전송함과 동시에 운전자가 룸에 입장한다.
    1.3 서버 소캣도 해당 코스에 대한 룸에 입장을 한다

  2. 운전자 위치정보를 받아 서버로 전달 후 계산해서 보내준다. 
    2.1 운전자의 위치정보를 룸에다 브로드 캐스트할 때 서버로 데이터가 전송된다.
      2.1.1 운전자는 getLocation()함수를 실행시켜 서버에 현재 위치 데이토를 전송한다. 
      2.1.2 주기적으로 getLocation()함수를 실행시켜 운전자의 위치정보를 업데이트 할 수 있게 한다.
      2.1.3 운전자가 직접 getLocation()함수를 실행시켜 최신 위치정보를 사용자에게 알릴 수 있다.
    2.2 서버로 전달된 데이터를 처리해서 속해있는 방에 뿌려준다.
      2.2.1 데이터 처리관련 기능은 mongodb에서 찾아보자

  3. 사용자는 메인 페이지 접속후 자신의 마이리스트의 있는 코스들의 룸입장을 시도한다
    3.1 로컬스토리에 있는 mylist들을 모두 입장한다
    3.2 운전자가 입장하여 active 상태를 모두에게 알린다.
    3.3 사용자는 서버로부터 계산된 운전자의 데이터를 받는다.
      3.3.1 사용자는 새로고침 버튼으로 실시간 정보를 요청할 수 있다.
*/
