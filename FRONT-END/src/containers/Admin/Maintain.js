import React, { useEffect } from 'react';
import { InputWithLabel, AuthButton, AuthError } from 'components/Auth';
import { AdminContent } from 'components/Admin';
import { AdminStepper } from 'components/Admin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';
import * as userActions from 'redux/modules/user';
import storage from 'lib/storage';
import {isEmail, isLength, isAlphanumeric} from 'validator';
import debounce from 'lodash/debounce';


function Maintain({ form, error, exists, result, AuthActions, UserActions, history }) {
  
  return (
    <AdminContent title="관리자 창">
    </AdminContent>
  );
};

export default connect(
  (state) => ({
    form: state.auth.getIn(['admin', 'form']),
    error: state.auth.getIn(['admin', 'error']),
    exists: state.auth.getIn(['admin', 'exists']),
    result: state.auth.get('result')
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(Maintain);