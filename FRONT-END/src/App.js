import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Home, Auth } from 'pages';
import HeaderContainer from 'containers/Base/HeaderContainer';

import storage from 'lib/storage';
import { connect } from 'react-redux';
import * as userActions from 'redux/modules/user';
import { bindActionCreators } from 'redux';

import socketIOClient from "socket.io-client";

const initialSocketInfo = {
  response: null,
  endpoint: 'http://localhost:4000'
}

function App({ UserActions }) {
  const [socketInfo, setSocketInfo] = useState(initialSocketInfo);
  const {endpoint, response} = socketInfo;
  useEffect(() => {
    // socket 작업
    const socket = socketIOClient(endpoint);
    // socket io test를 위한 소스
    socket.on("test", data => setSocketInfo({ ...socketInfo, response: data.data }));

    initializeUserInfo();
  },[]);

  // socket io test를 위한 소스
  console.log(response ? response : "No data received!!");

  const initializeUserInfo = async () => {
    const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if(!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.
    console.log(loggedInfo) 
    UserActions.setLoggedInfo(loggedInfo);

    try {
      await UserActions.checkStatus();
    } catch (error) {
      storage.remove('loggedInfo');
      window.location.href = '/auth/login?expired';
    }
  };


  return (
    <div>
        <HeaderContainer/>
        <Route exact path="/" component={Home}/>
        <Route path="/auth" component={Auth}/>
    </div>
  );
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(App);