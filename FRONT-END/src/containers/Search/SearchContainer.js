import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { LogoWrapper } from 'components/List/Car';
import styled from 'styled-components';
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { yellow } from '@material-ui/core/colors';
import SearchInput from 'components/Search/SearchInput';
import * as searchActions from 'redux/modules/search';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from "query-string";

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
  Button: {
    margin: theme.spacing(0.5),
  },

}));
// children 이 들어가는 곳
const Contents = styled.div`
    background: white;
    padding: 1rem 0 1rem 0;
    height: auto;
`;

const Groups = {
 Group : [
   {
   name: "학원1",
   id : 1
 },
{
  name: "학원2",
  id : 2
},
{
  name: "학원3",
  id : 3
},
{
  name: "학원4",
  id : 4
},
{
 name: "학원5",
 id : 5
},
{
 name: "학원6",
 id : 6
},
{
  name: "학원7",
  id : 7
},
{
 name: "학원8",
 id : 8
},
{
 name: "학원9",
 id : 9
}
]
}

function SearchContainer({history, result, location, SearchActions, keywords}) {
  const classes = useStyles();
  const GD = Groups.Group;

  useEffect(() => {
    const query = queryString.parse(location.search);
    SearchActions.searchGroup({keywords: query.keywords})
    return () => {
      SearchActions.changeInput({name: 'keywords', value: ''});
      SearchActions.setResult([])
    }
  }, [SearchActions])
  
  const onSubmit = event => {
    event.preventDefault(); // submit event 초기화
    const keywordsList = keywords.split(' ').filter(str => str !== '');
    let keys = ''
    for(const i in keywordsList){
      keys += i == 0
        ? keywordsList[i]
        : `+${keywordsList[i]}`;
    }
    history.push("/search/?keywords="+keys);  // enter시 searchContainer로 연결 
    SearchActions.searchGroup({keywords})
  }
  const searchOnChange = event => {
    const {name, value} = event.target;
    SearchActions.changeInput({name, value})
  }

  return (
    <>
      <LogoWrapper title="Search List" >
      </LogoWrapper>
      <Contents>
      <SearchInput onSubmit={onSubmit} onChange={searchOnChange} value={keywords} />
        <List dense className={classes.root}>
        {
          typeof(result) === 'object'
          ? result.map(value => {
              const labelId = `transfer-list-all-item-${value._id}-label`;
              return (
                <ListItem key={value._id}>
                  <FormControlLabel
                  control={<Checkbox icon={<StarBorderIcon />} checkedIcon={<StarIcon style={{ color: yellow[500] }} />} name="checkedH" />}
                  />
                  <ListItemText id={labelId} primary={`${value.name}`} />
                  <ListItemSecondaryAction>
                    <Button className={classes.Button} variant="outlined">상세보기</Button>
                    {/* onClick={ (검색 인풋값) =>  {history.push('/Search/listinfo')} */}
                    {/* 위에 온클릭 이벤트를 추가해야함 */}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
          : <ListItem key={0}>{result}</ListItem>
        }
        </List>
      </Contents>
    </>
  );
}

export default connect(
  (state) => ({
    keywords: state.search.get('keywords'),
    result: state.search.get('result')
  }),
  (dispatch) => ({
    SearchActions: bindActionCreators(searchActions, dispatch) 
  })
)(SearchContainer);