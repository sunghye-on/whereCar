import React, { useEffect } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink  } from 'components/Auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from 'redux/modules/auth';

function Login({ form, AuthActions }) {
  
  useEffect(() => {
    return () => {
      AuthActions.initializeForm('login');
    };
  }, [AuthActions])

  const handleChange = e => {
    const { name, value } = e.target;
    AuthActions.changeInput({
      name,
      value,
      form: 'login'
    })
  };

  return (
    <AuthContent title="로그인">
      <InputWithLabel label="아이디" name="email" placeholder="이메일" onChange={handleChange}/>
      <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" onChange={handleChange}/>
      <AuthButton>로그인</AuthButton>
      <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
    </AuthContent>
  );
};

export default connect(
  (state) => ({
      form: state.auth.getIn(['login', 'form'])
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(Login);