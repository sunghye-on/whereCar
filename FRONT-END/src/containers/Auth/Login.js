import React from 'react';
import { AuthContent } from 'components/Auth';
import { InputWithLabel } from '../../components/Auth';

export default function Login() {
  return (
    <AuthContent title="로그인">
      <InputWithLabel label="아이디" name="email" placeholder="이메일" />
      <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" />
    </AuthContent>
  );
};