import React from 'react';
import { InputWithLabel } from 'components/Auth';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Step1() {
  return (
    <>
      <SlideBtn/>
      <InputWithLabel label="단체/학원이름" name="groupName" placeholder="학원이름"/>
      <InputWithLabel label="단체 연락처" name="groupTell" placeholder="010-1234-5678"/>
    </>
  )
}

// <InputWithLabel label="단체유형" name="groupType" placeholder="단체유형"/>
const SlideBtn = () => {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setAge(event.target.value);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        단체유형
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={age}
        onChange={handleChange}
        labelWidth={labelWidth}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>학원</MenuItem>
        <MenuItem value={20}>유치원</MenuItem>
        <MenuItem value={30}>학교</MenuItem>
        <MenuItem value={30}>기타</MenuItem>
      </Select>
    </FormControl>
  )
}