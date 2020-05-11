/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {AdminWrapper} from 'components/Admin';
import {ControlBtn} from 'components/Controller';
import {DriverInfo} from 'containers/Controller';

import * as listActions from 'redux/modules/list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import storage from 'lib/storage.js';
import CustomConsole from 'lib/CustomConsole';
import { Grid, makeStyles, FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import styled from 'styled-components';
import { media } from 'lib/styleUtils';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function DriverCtrl({driverInfo, carList, ListActions, carInfo, history}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
  });
  let data = null;

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  // didMount
  useEffect(() => {
    CustomConsole.correct('운전자페이지 접속', '화면에서 메뉴를 선택해주세요.');
  }, []);

  useEffect(() => {
    data = storage.get('driverInfo') ? storage.get('driverInfo') : driverInfo;
    if(data.auth) {
      ListActions.getCourse({id:data.courseId})
      ListActions.getCar({id:data.carId})
    }
  }, []);

  // 로컬저장소에 현재 운전할 정보를 저장
  useEffect(() => {
    driverInfo.auth && storage.set('driverInfo', driverInfo)
  }, [driverInfo])
  
  return (
    <AdminWrapper path="/" title="DRIVER-MODE">
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
              label={state.checkedA ? "위치공유⭕" : "위치공유❌"}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" justify="center" alignItems="center">
            <ControlBtn/>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DriverInfo />
        </Grid>
      </Grid>
    </AdminWrapper>
  );
}

export default connect(
  (state) => ({
    carList: state.list.getIn(['carInfo', 'carList']),
    carInfo: state.list.get('result'),
    driverInfo: state.list.get('driverInfo').toJS()
  }),
  (dispatch) => ({
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(DriverCtrl);