import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Checkbox, ListItemIcon } from "@material-ui/core";

import DeleteIcon from '@material-ui/icons/Delete';
import FaceIcon from '@material-ui/icons/Face';

export default function CarItem({ value, labelId, bottomValue }) {
  return (
    <ListItem key={value.id} button>
      <ListItemAvatar>
        <Avatar
          alt={`Avatar n°${value.id + 1}`}
          src={`/static/images/avatar/${value.id + 1}.jpg`}
        />
      </ListItemAvatar>
      <ListItemText id={labelId} primary={`${value.driverName}`} />
      <ListItemSecondaryAction>
        { bottomValue === 2 ?
          <DeleteIcon/>
          : null
        }
        
      </ListItemSecondaryAction>
      <ListItemIcon>
        { value.active ?
            <FaceIcon color="secondary"/>
          : <FaceIcon />
        }
      </ListItemIcon>
    </ListItem>
  );
}