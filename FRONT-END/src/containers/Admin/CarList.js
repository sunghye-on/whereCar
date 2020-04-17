import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import {AdminWrapper} from 'components/Admin';
import { Tooltip, Fab, Grid } from '@material-ui/core';

import * as listActions from 'redux/modules/list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import storage from 'lib/storage.js';

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  root: {
    width: '100%',
    maxWidth: 500,
    maxHeight: 300,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    marginRight: '1rem'
  }
}));

const initialState = {
  groupInfo: {
      users: [
          "5e8424fddd727b8885616051",
          "5e842525dd727b8885616052"
      ],
      drivers: [],
      _id: "5e842681dd727b8885616053",
      type: "Academy",
      name: "asdasdasd",
      tell: "01040247797",
      location: "incheonaaa",
      description: "aaaaaaaaa",
      certification: "asdddddddd",
      createdAt: "2020-04-01T05:28:33.999Z",
      __v: 0
  },
  carList: [
      {
        _id: "5e90a8952463b3ddb835f181",
        carName: "마티즈",
        carNumber: "13가1212",
        seatNumber: "3",
        inspectionDate: "2020-01-01T00:00:00.000Z",
        carImageUrl: "uploads\\car\\banner1586538645039.jpg",
        group: "5e842681dd727b8885616053",
        createdAt: "2020-04-10T17:10:45.075Z",
        __v: 0
      },
      {
        _id: "5e90a8952463b3ddb835f181",
        carName: "벤츠",
        carNumber: "13가1212",
        seatNumber: "3",
        inspectionDate: "2020-01-01T00:00:00.000Z",
        carImageUrl: "uploads\\car\\banner1586538645039.jpg",
        group: "5e842681dd727b8885616053",
        createdAt: "2020-04-10T17:10:45.075Z",
        __v: 0
      },
      {
        _id: "5e90a8952463b3ddb835f181",
        carName: "아우디",
        carNumber: "13가1212",
        seatNumber: "3",
        inspectionDate: "2020-01-01T00:00:00.000Z",
        carImageUrl: "uploads\\car\\banner1586538645039.jpg",
        group: "5e842681dd727b8885616053",
        createdAt: "2020-04-10T17:10:45.075Z",
        __v: 0
      }
  ]
}

function CarList({history, carList, ListActions}) {
  const classes = useStyles();
  const adminInfo = storage.get("adminInfo");

  useEffect(() => {
    const id = adminInfo.group;
    ListActions.getCars({id});
  }, [ListActions, adminInfo]);

  const handleOnClick = (route) => {
    history.push(route)
  };

  return (
    <AdminWrapper>
      <List className={classes.root}>
        {
          carList.map(car => (
            <ListItem key="1" role={undefined} dense button onClick={function(){}}>
              <DriveEtaIcon className={classes.icon}/>
              <ListItemText id={1} primary={car.carName} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Tooltip title="Add" aria-label="add" className={classes.insertButton} onClick={() => handleOnClick("/admin/car/register")}>
                <Fab color="primary" className={classes.fab}>
                  <AddIcon />
                </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </AdminWrapper>
  );
}

export default connect(
  (state) => ({
    carList: state.list.getIn(['carInfo', 'carList'])
  }),
  (dispatch) => ({
      ListActions: bindActionCreators(listActions, dispatch)
  })
)(CarList);