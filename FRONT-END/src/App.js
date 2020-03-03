import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Home, Auth, Admin, Search } from 'pages';
import HeaderContainer from 'containers/Base/HeaderContainer';

import storage from 'lib/storage';
import { connect } from 'react-redux';
import * as userActions from 'redux/modules/user';
import * as socketActions from 'redux/modules/socket';
import { bindActionCreators } from 'redux';

function App({ UserActions, SocketActions }) {
  useEffect(() => {
    initializeUserInfo();
  },[]);

  const initializeUserInfo = async () => {
    const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.

    if(!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.
    UserActions.setLoggedInfo(loggedInfo);
    
    try {
      await UserActions.checkStatus();
    } catch (error) {
      storage.remove('loggedInfo');
      storage.remove('adminInfo');
      window.location.href = '/auth/login?expired';
    }
  };

  return (
    <div>
        <HeaderContainer/>
        <Route exact path="/" component={Home}/>
        <Route path="/auth" component={Auth}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/search" component={Search}/>
    </div>
  );
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
    SocketActions: bindActionCreators(socketActions, dispatch)
  })
)(App);