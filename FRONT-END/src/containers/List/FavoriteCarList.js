import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { CarItem } from 'components/List/Car';
import { LogoWrapper } from 'components/List/Car';
import { ListWrapper } from 'components/List';
import styled from 'styled-components';

import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as driverActions from 'redux/modules/driverList';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '23rem',
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
    padding: 2rem;
    height: auto;
`;

// dummyData
const dummyDriver = [
  {
    id: 0,
    driverName: '홍길동1',
    routes: [
      { locationName: '1', Latitude: '0', longitude: '0' },
      { locationName: '2', Latitude: '0', longitude: '0' },
      { locationName: '3', Latitude: '0', longitude: '0' }
    ],
    currentLoc: { Latitude: '0', longitude: '0' }
  },
  {
    id: 1,
    driverName: '홍길동2',
    routes: [
      { locationName: '1', Latitude: '0', longitude: '0' },
      { locationName: '2', Latitude: '0', longitude: '0' },
      { locationName: '3', Latitude: '0', longitude: '0' }
    ],
    currentLoc: { Latitude: '0', longitude: '0' }
  },
  {
    id: 2,
    driverName: '홍길동3',
    routes: [
      { locationName: '1', Latitude: '0', longitude: '0' },
      { locationName: '2', Latitude: '0', longitude: '0' },
      { locationName: '3', Latitude: '0', longitude: '0' }
    ],
    currentLoc: { Latitude: '0', longitude: '0' }
  }
];

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

const initialSocketInfo = {
  response: null,
  endpoint: 'http://localhost:4000',
  driverList: dummyDriver
};

function FavoriteCarList({children}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const [socketInfo, setSocketInfo] = React.useState(initialSocketInfo);
  const {endpoint, response, driverList} = socketInfo;

  React.useEffect(() => {
    // socket 작업
    const socket = socketIOClient(endpoint); 
    
    // socket io test를 위한 소스
    // driverList 받아오기[API]
    socket.emit("driverActive", {driver: driver1, active: true}); // test용 driver 활성화 [test]
    socket.emit("driverActive", {driver: driver2, active: true}); // test용 driver 활성화 [test]
    socket.on("sendNotifDriverActive", ({driver, active}) => {
      setSocketInfo({ 
        ...socketInfo, 
        driverList: driverList.map(d => {
          if(d.driverName === driver.driverName){
            d.active = active;
          }
          return d;
        }) 
      });
    });

  },[]);
  console.log(driverList);
  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  
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
                  value.active ?
                  <CarItem checked={checked} value={value} labelId={labelId} handleToggle={handleToggle} />
                  : null
                );
              })
            : null
          }
        </List>
      </Contents>
    </ListWrapper>
  );
}

export default connect(
  (state) => ({
    driverList: state.driver.get('driverList'),
  }),
  (dispatch) => ({
    DriverActions: bindActionCreators(driverActions, dispatch)
  })
)(FavoriteCarList);