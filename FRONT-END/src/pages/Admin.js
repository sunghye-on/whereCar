import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'redux/modules/base';
import { AdminWrapper } from '../components/Admin';
import { Maintain, HeaderContainer } from '../containers/Admin';
import { Route, Redirect } from 'react-router-dom';

function Admin({ BaseActions, loggedIn }) {
  useEffect(() => {
    BaseActions.setHeaderVisibility(false);
    return () => {
      BaseActions.setHeaderVisibility(true);
    };
  }, [BaseActions]);

  return (
    <HeaderContainer>
      <AdminWrapper>
        <Route path="/admin/management" component={ Maintain } >
          {!loggedIn && <Redirect to="/" />}
        </Route>
      </AdminWrapper>
    </HeaderContainer>
  );
};

export default connect(
  (state) => ({
    loggedIn: state.user.get('logged')
  }),
  (dispatch) => ({
      BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Admin);