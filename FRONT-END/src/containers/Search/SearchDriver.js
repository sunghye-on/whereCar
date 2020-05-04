import React, { useEffect, useState } from 'react';
import { AuthContent, InputWithLabel, AuthButton, AuthError } from 'components/Auth';
import { SearchStepper } from 'components/Search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';
import * as userActions from 'redux/modules/user';
import * as listActions from 'redux/modules/list';
import storage from 'lib/storage';
import {isEmail, isLength, isAlphanumeric} from 'validator';
import Axios from 'axios';
import { LogoWrapper } from 'components/List/Car';
import styled from 'styled-components';
import * as MyListAPI  from 'lib/api/myList';

const Contents = styled.div`
    background: white;
    padding: 1rem 1rem 1rem 1rem;
    height: auto;
`;

function AdminRegister({ courseList, carList, error, AuthActions, match, ListActions, history }) {
  const adminInfoId = storage.get('adminInfo');
  const [sendData, setSendData] = useState({
    carId: null,
    courseId: null
  })
  const { carId, courseId } = sendData;

  useEffect(() => {
    return () => {
      AuthActions.initializeForm('admin');
    };
  }, [AuthActions]);

  useEffect(() => {
    const { id } = match.params;
    ListActions.getCourses({ id });
    ListActions.getCars({ id });
  }, [ListActions])

  const setError = (message) => {
    AuthActions.setError({ form: 'admin', message });
  }

  const validate = {
    carId: carId => {
      if(!isLength(carId, {min: 1})) {
        setError('차량을 선택해 주세요');
        return false;
      }
      return true;
    },
    courseId: courseId => {
      if(!isLength(courseId, { min: 1})) {
        setError('세부 코스를 선택해 주세요');
        return false;
      }
      setError(null);
      return true;
    }
  };



  const handleChange = e => {
    const { name, value } = e.target;
    console.log(e.target)
    setSendData({
      ...sendData,
      [name]: value
    });
  };

  
  const handleRegister = async () => {
    if(error) return; // 현재 에러가 있는 상태라면 진행하지 않음

    if(!validate['carId'](carId)||
       !validate['courseId'](courseId)) return; // 하나라도 실패하면 진행하지 않음

    let formdata = new FormData();
    formdata.append('courseId', courseId);
    formdata.append('carId', carId);
    console.log(formdata.append('courseId', courseId))
    console.log("formdata==========",sendData)
    console.log("formdata==========",formdata)
    try {
      await MyListAPI.activeCourse({courseId, carId}).then(
        result => {
          console.log(result);
      });
      history.push('/'); // 회원가입 성공시 홈페이지로 이동
    } catch (error) {
      // 에러 처리하기
      if(error.response.status === 409) {
        const message = '에러 발생'
        setError(message);
      }
      setError('알 수 없는 에러가 발생했습니다.')
    }
  }

  return (
    <>
    <LogoWrapper title="Home" >
    </LogoWrapper>
    <Contents>
        <SearchStepper error={error} handleChange={handleChange} sendData={sendData} handleRegister={handleRegister} data={ {carList, courseList} }/>
    </Contents>
     </>  
  );
};

export default connect(
  (state) => ({
    error: state.auth.getIn(['admin', 'error']),
    carList: state.list.getIn(['carInfo', 'carList']),
    courseList: state.list.getIn(['courseInfo', 'courseList'])
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    ListActions: bindActionCreators(listActions, dispatch) 
  })
)(AdminRegister);