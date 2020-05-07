import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { CarItem } from "components/List/Car";
import { LogoWrapper } from "components/List/Car";
import { ListWrapper, BottomNav } from "components/List";
import styled from "styled-components";

import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as socketActions from "redux/modules/socket";
import * as listActions from "redux/modules/list";
import { DriverListSoc } from "sockets";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "21rem",
    // maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: "21rem",
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
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
  driverName: "홍길동1",
  routes: [
    { locationName: "1", Latitude: "0", longitude: "0" },
    { locationName: "2", Latitude: "0", longitude: "0" },
    { locationName: "3", Latitude: "0", longitude: "0" },
  ],
  currentLoc: { Latitude: "0", longitude: "0" },
};
const driver2 = {
  id: 1,
  driverName: "홍길동2",
  routes: [
    { locationName: "1", Latitude: "0", longitude: "0" },
    { locationName: "2", Latitude: "0", longitude: "0" },
    { locationName: "3", Latitude: "0", longitude: "0" },
  ],
  currentLoc: { Latitude: "0", longitude: "0" },
};

function FavoriteCarList({
  children,
  socket,
  driverList,
  SocketActions,
  ListActions,
}) {
  const classes = useStyles();
  const [bottomValue, setBottomValue] = React.useState(0);

  /* ▼▼▼ [김성현님 수정바람] test용 데이터 송수신 ▼▼▼*/
  /* active socket event */
  useEffect(() => {
    if (socket) {
      DriverListSoc(socket, SocketActions);
    }
    // 여기서 룸 나가기(소켓 닫기)
    return () => {};
  }, [SocketActions, socket]);

  /* initialize socket */
  useEffect(() => {
    // soket 초기화 부분
    const endpoint = "http://localhost:4000";
    const socket = socketIOClient(endpoint);
    SocketActions.setSocket({ socket });
  }, [SocketActions]);

  // MyList 갱신부분
  useEffect(() => {
    ListActions.getMyList(); // MyList 갱신
  }, [ListActions]);

  return (
    <ListWrapper>
      <LogoWrapper title="My Car List" titleUrl="/"></LogoWrapper>
      <Contents>
        <List dense className={classes.root} subheader={<li />}>
          {driverList
            ? driverList.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value.id}`;
                return (
                  <CarItem
                    value={value}
                    labelId={labelId}
                    bottomValue={bottomValue}
                  />
                );
              })
            : null}
        </List>
      </Contents>
      <BottomNav value={bottomValue} setValue={setBottomValue} />
    </ListWrapper>
  );
}

export default connect(
  (state) => ({
    driverList: state.socket.getIn(["myList", "driverList"]).toJS(),
    socket: state.socket.get("socket").socket,
  }),
  (dispatch) => ({
    SocketActions: bindActionCreators(socketActions, dispatch),
    ListActions: bindActionCreators(listActions, dispatch),
  })
)(FavoriteCarList);
