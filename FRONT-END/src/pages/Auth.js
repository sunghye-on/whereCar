import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'redux/modules/base';
import { AuthWrapper } from '../components/Auth';
import { Login, Register, UpdateProfile } from '../containers/Auth';
import { Route } from 'react-router-dom';

function Auth({ BaseActions }) {
  useEffect(() => {
    BaseActions.setHeaderVisibility(false);
    return () => {
      BaseActions.setHeaderVisibility(true);
    };
  }, [BaseActions]);

  return (
    <AuthWrapper>
      <Route path="/auth/login" component={ Login } />
      <Route path="/auth/register" component={ Register } />
      <Route path="/auth/profile" component={ UpdateProfile } />
    </AuthWrapper>
  );
};

export default connect(
  (state) => ({

  }),
  (dispatch) => ({
      BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Auth);