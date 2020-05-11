/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Grid, ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listActions from 'redux/modules/list';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import storage from 'lib/storage.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: '14vh',
    height: '14vh',
  },
}));
const DriverInfo = ({driverInfo, result}) => {
  const classes = useStyles();
  const active = false; // 운전활성화 버튼
  const {car, course} = result;
  const {groupName, groupId} = driverInfo.groupName.length !==0 
    ? driverInfo 
    : storage.get('driverInfo') 
    ? storage.get('driverInfo') 
    : null
  let data = null;
  const parsing =  car && car.carImageUrl? car.carImageUrl.split('\\') : null;
  let imgUrl = 'http://localhost:4000/api';
  if(parsing){
    for(const i in parsing) {
      imgUrl += '/'+parsing[i]
    }
  }

  useEffect(() => {
    data = storage.get('driverInfo')
      ? storage.get('driverInfo')
      : driverInfo;
  }, [])
  return car && course ? (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={4}>
        {/* 자동차 이미지 */}
        <Avatar alt="Remy Sharp" src={imgUrl} className={classes.large} />
      </Grid>
      <Grid item xs={8}>
        <div>학원이름: {groupName}</div>
        <div>코스이름: {course.courseName}</div>
        <div>현재위치: {active? '????' : '출발전입니다.'}</div>
      </Grid>
    </Grid>
  ) : null
}

export default connect(
  (state) => ({
    carList: state.list.getIn(['carInfo', 'carList']),
    carInfo: state.list.get('result'),
    driverInfo: state.list.get('driverInfo').toJS(),
    result: state.list.get('result').toJS()
  }),
  (dispatch) => ({
      ListActions: bindActionCreators(listActions, dispatch)
  })
)(DriverInfo);