import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ExtendListItem } from 'components/Base/List';
import styled from 'styled-components';
import { List, IconButton, ListItem, ListItemText } from '@material-ui/core';

import DriveEtaIcon from '@material-ui/icons/DriveEta';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(2),
    },
    root: {
      width: '100%',
      maxWidth: 500,
      overflow: 'auto',
      backgroundColor: theme.palette.background.paper,
    },
    icon: {
      marginRight: '1rem'
    },
    bottomBtn: {
      float: 'bottom'
    },
    updatebtn: {
      '& > span': {
        margin: theme.spacing(2),
      }
    }
  }));

const handleOnUpdate = (route) => {
};
export default function DetailCourse({ courseList }) {
  const classes = useStyles();
  return (
    <>
      <hr/> 
      <List className={classes.root}>
        {
          courseList.map(course => (
            <ListItem key="1" role={undefined} dense button onClick={function(){}}>
              <DriveEtaIcon className={classes.icon}/>
                <ListItemText id={1} primary={<ExtendListItem title={course.courseName} subContent={course.stations}/> }/>      
                <IconButton edge="end" aria-label="comments" onClick={()=>handleOnUpdate(`/admin/course/update/${course._id}`)}>
                    <CreateIcon />
                </IconButton>
            </ListItem>
          ))
        }
      </List>
    </>
  )
}