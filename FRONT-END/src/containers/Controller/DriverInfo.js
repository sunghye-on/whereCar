import React from 'react';
import { Grid, ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listActions from 'redux/modules/list';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));
const DriverInfo = () => {
  const classes = useStyles();
  const active = false; // 운전활성화 버튼
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={4}>
        {/* 자동차 이미지 */}
        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" className={classes.large} />
      </Grid>
      <Grid item xs={8}>
        <div>학원이름: ????</div>
        <div>코스이름: ????</div>
        <div>현재위치: {active? '????' : '출발전입니다.'}</div>
      </Grid>
    </Grid>
  )
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
)(DriverInfo);