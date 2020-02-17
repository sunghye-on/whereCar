// Server에서 event 를 emit 하고 on하는 파일

// socket: 연결된 소켓, io: 전역소켓(Server Socket)
const socketController = (socket, io) => {
  console.log('✅  socket connect success!!');
};

module.exports = socketController;