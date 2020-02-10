import React, { useEffect } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, AuthError } from 'components/Auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';
import {isEmail, isLength, isAlphanumeric} from 'validator';
import debounce from 'lodash/debounce';

function Register({ form, error, exists, AuthActions }) {
  const { email, displayName, password, passwordConfirm } = form.toJS();

  useEffect(() => {

    return () => {
      AuthActions.initializeForm('register');
    };
  }, [AuthActions]);

  const setError = (message) => {
    AuthActions.setError({ form: 'register', message });
  }

  const validate = {
    email: value => {
      if(!isEmail(value)) {
        setError('잘못된 이메일 형식입니다.');
        return false;
      }
      return true;
    },
    displayName: value => {
      if(!isAlphanumeric(value) || isLength(value, { min: 4, max: 15 })) {
        setError('아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.');
        return false;
      }
      return true;
    },
    password: value => {
      if(!isLength(value, { min: 6 })){
        setError('비밀번호를 6자 이상 입력하세요.');
        return false
      }
      return true;
    },
    passwordConfirm: value => {
      if(form.get('password') !== value) {
        setError('비밀번호 확인이 일치하지 않습니다.');
        return false;
      }
      return true;
    }
  };

  const checkEmailExists = debounce(async email => {
    try {
      await AuthActions.checkEmailExists(email);
      if(exists.get('email')) {
        setError('이미 존재하는 이메일입니다.');
      } else {
        setError(null);
      }
    } catch (error) {
      console.log(error);
    }
  }, 300);

  const checkDisplayNameExists = debounce(async displayName => {
    try {
      await AuthActions.checkDisplayNameExists(displayName);
      if(exists.get('displayName')) {
        setError('이미 존재하는 아이디입니다.');
      } else {
        setError(null);
      }
    } catch (error) {
      console.log(error);
    }
  }, 300);

  const handleChange = e => {
    const { name, value } = e.target;
    AuthActions.changeInput({
      name,
      value,
      form: 'register'
    });
    
    const validation = validate[name](value);
    if(name.indexOf('password') > -1 || !validation) return; // 비밀번호 검증이거나, 검증 실패하면 여기서 마침

    const check = name === 'email' ? checkEmailExists : checkDisplayNameExists;
    check(value);
  };

  return (
    <AuthContent title="회원가입">
        <InputWithLabel value={email} label="이메일" name="email" placeholder="이메일" onChange={handleChange} />
        <InputWithLabel value={displayName} label="아이디" name="displayName" placeholder="아이디" onChange={handleChange} />
        <InputWithLabel value={password} label="비밀번호" name="password" placeholder="비밀번호" type="password" onChange={handleChange} />
        <InputWithLabel value={passwordConfirm} label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password" onChange={handleChange} />
        {
          error && <AuthError>{error}</AuthError>
        }
        <AuthButton>회원가입</AuthButton>
        <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
    </AuthContent>
  );
};

export default connect(
  (state) => ({
    form: state.auth.getIn(['register', 'form']),
    error: state.auth.getIn(['register', 'error']),
    exists: state.auth.getIn(['register', 'exists'])
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(Register);