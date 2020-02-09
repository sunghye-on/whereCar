import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'redux/modules/base';
import { AuthWrapper } from '../components/Auth';

function Auth({ BaseActions }) {
  useEffect(() => {
    BaseActions.setHeaderVisibility(false);
    return () => {
      BaseActions.setHeaderVisibility(true);
    };
  }, [BaseActions]);

  return (
    <AuthWrapper>
      
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