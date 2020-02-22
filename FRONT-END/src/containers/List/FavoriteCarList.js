import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { CarItem } from 'components/List/Car';
import { LogoWrapper } from 'components/List/Car';
import { ListWrapper, BottomNav } from 'components/List';
import styled from 'styled-components';

import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as socketActions from 'redux/modules/socket';
import { driverListSoc } from 'sockets';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '21rem',
    // maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '21rem',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

// children 이 들어가는 곳
const Contents = styled.div`
    background: white;
    padding: 1rem 0 1rem 0;
    height: auto;
`;

// dummy Data [ test용 ]
const driver1 = {
  id: 0,
  driverName: '홍길동1',
  routes: [
    { locationName: '1', Latitude: '0', longitude: '0' },
    { locationName: '2', Latitude: '0', longitude: '0' },
    { locationName: '3', Latitude: '0', longitude: '0' }
  ],
  currentLoc: { Latitude: '0', longitude: '0' }
};
const driver2 = {
  id: 1,
  driverName: '홍길동2',
  routes: [
    { locationName: '1', Latitude: '0', longitude: '0' },
    { locationName: '2', Latitude: '0', longitude: '0' },
    { locationName: '3', Latitude: '0', longitude: '0' }
  ],
  currentLoc: { Latitude: '0', longitude: '0' }
};

function FavoriteCarList({children, driverList, SocketActions}) {
  const classes = useStyles();
  const [bottomValue, setBottomValue] = React.useState(0);
  // socket 작업
  const endpoint = 'http://localhost:4000';
  const socket = socketIOClient(endpoint);

  React.useEffect(() => {

    // driverList 소켓통신 관련
    driverListSoc(socket, SocketActions);
    
  },[]);

  // test용입니다. [Server에서 사용되는 소스]
  socket.emit("driverActive", {driver: driver1, active: true}); // test용 driver 활성화 [test]
  socket.emit("driverActive", {driver: driver2, active: true}); // test용 driver 활성화 [test]

  console.log(driverList);
  return (
    <ListWrapper>
      <LogoWrapper title="My Car List" titleUrl="/">
      </LogoWrapper>
      <Contents>
        <List dense className={classes.root} subheader={<li />}>
          {
            driverList ? 
            driverList.map(value => {
                const labelId = `checkbox-list-secondary-label-${value.id}`;
                return (
                  <CarItem value={value} labelId={labelId} bottomValue={bottomValue}/>
                );
              })
            : null
          }
        </List>
      </Contents>
      <BottomNav value={bottomValue} setValue={setBottomValue}/>
    </ListWrapper>
  );
}

export default connect(
  (state) => ({
    driverList: state.socket.getIn(['myList', 'driverList']).toJS(),
  }),
  (dispatch) => ({
    SocketActions: bindActionCreators(socketActions, dispatch)
  })
)(FavoriteCarList);