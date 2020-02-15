import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { CarItem } from 'components/List/Car';

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

export default function FavoriteCarList({children}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

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
    <List dense className={classes.root} subheader={<li />}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <CarItem checked={checked} value={value} labelId={labelId} handleToggle={handleToggle} />
        );
      })}
    </List>
  );
}