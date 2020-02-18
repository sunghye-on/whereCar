import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Checkbox } from "@material-ui/core";

export default function CarItem({ checked, value, labelId, handleToggle }) {
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
        <Checkbox
          edge="end"
          onChange={handleToggle(value.id)}
          checked={checked.indexOf(value.id) !== -1}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}