import React from 'react';
import { InputWithLabel } from 'components/Auth';

export default function Step2({handleChange, form}) {
  const { location, description, certification } = form;
  return (
    <>
      <InputWithLabel value={location} label="단체 위치" name="location" placeholder="단체위치..." onChange={handleChange}/>
      <InputWithLabel value={description} label="단체(부가)설명" name="description" placeholder="단체설명..." onChange={handleChange}/>
      <InputWithLabel value={certification} label="단체/학원 증빙자료" name="certification" placeholder="증빙자료..." onChange={handleChange}/>
    </>
  )
}