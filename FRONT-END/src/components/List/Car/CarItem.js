import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Checkbox } from "@material-ui/core";

export default function CarItem({ checked, value, labelId, handleToggle }) {
  return (
    <ListItem key={value} button>
      <ListItemAvatar>
        <Avatar
          alt={`Avatar n°${value + 1}`}
          src={`/static/images/avatar/${value + 1}.jpg`}
        />
      </ListItemAvatar>
      <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
      <ListItemSecondaryAction>
        <Checkbox
          edge="end"
          onChange={handleToggle(value)}
          checked={checked.indexOf(value) !== -1}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}