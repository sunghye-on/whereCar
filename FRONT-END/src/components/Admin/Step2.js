import React from 'react';
import { InputWithLabel } from 'components/Auth';

export default function Step2() {
  return (
    <>
      <InputWithLabel label="단체 위치" name="groupLoc" placeholder="단체위치..."/>
      <InputWithLabel label="단체(부가)설명" name="groupDesc" placeholder="단체설명..."/>
      <InputWithLabel label="단체/학원 증빙자료" name="password" placeholder="비밀번호" type="password"/>
    </>
  )
}