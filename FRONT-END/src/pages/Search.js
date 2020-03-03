import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'redux/modules/base';
import { AuthWrapper } from '../components/Auth';
import { SearchContainer } from '../containers/Search';
import { Route, Redirect } from 'react-router-dom';

function Search({ BaseActions, loggedIn }) {
  useEffect(() => {
    BaseActions.setHeaderVisibility(false);
    return () => {
      BaseActions.setHeaderVisibility(true);
    };
  }, [BaseActions]);

  // 검색페이지 접근은 인증된 유저만 가능한지, 아닌지 논의가 필요
  return (
    <AuthWrapper>
      <Route path="/search" component={ SearchContainer } >
      </Route>
    </AuthWrapper>
  );
};

export default connect(
  (state) => ({
    loggedIn: state.user.get('logged')
  }),
  (dispatch) => ({
      BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Search);