import React from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from 'components/Auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';

function Register({ form, AuthActions }) {

  const handleChange = e => {
    const { name, value } = e.target;
    AuthActions.changeInput({
      name,
      value,
      form: 'register'
    });
  };

  return (
    <AuthContent title="회원가입">
        <InputWithLabel label="이메일" name="email" placeholder="이메일" onChange={handleChange} />
        <InputWithLabel label="아이디" name="displayName" placeholder="아이디" onChange={handleChange} />
        <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" onChange={handleChange} />
        <InputWithLabel label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password" onChange={handleChange} />
        <AuthButton>회원가입</AuthButton>
        <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
    </AuthContent>
  );
};

export default connect(
  (state) => ({
    form: state.auth.getIn(['register', 'form'])
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(Register);