/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LogoWrapper } from 'components/List/Car';
import styled from 'styled-components';
import * as listActions from 'redux/modules/list';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Modal from '@material-ui/core/Modal';

import { DetailContent, DetailCourse } from 'components/Search';

const useStyles = makeStyles((theme) => ({
  
    root: {
      maxWidth: 345,
      margin: "auto"
    },
    media: {
      paddingTop: '60%',
      overflow: 'hidden'
    },
    CardContent: {
      maxwidth: 140
    },
    paper: {
      paddingLeft:10,
      paddingBottom: 10
    },
    modalPaper: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: 600,
      maxHeight: 600,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
    },
    modalImgContainer: {
      overflowY: 'auto',
      width: '100%',
      height: 400
    },
    modalGridPaper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
// children 이 들어가는 곳
const Contents = styled.div`
    background: white;
    padding: 1rem 0 1rem 0;
    height: auto;
`;

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function SearchDetail({history, ListActions, courseInfo, match}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const { courseList, groupInfo, memberInfo } = courseInfo;

  const parsing = groupInfo.certification? groupInfo.certification.split('\\') : null;
  let imgUrl = 'http://localhost:4000/api';
  if(parsing){
    for(const i in parsing) {
      imgUrl += '/'+parsing[i]
    }
  }

  useEffect(() => {
    const { id } = match.params;
    ListActions.getCourses({ id })
  }, [ListActions])
 
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // this is modal component
  const body = (
    <Grid container spacing={3} style={modalStyle} className={classes.modalPaper}>
      <Grid item xs={12} sm={12}>
        <Paper className={classes.modalGridPaper}>
          <h2 id="simple-modal-title">Certification</h2>
          <p id="simple-modal-description">
            {groupInfo.name} 학원 인증서입니다.
          </p>
          <div className={classes.modalImgContainer}>
              <img 
                src={imgUrl} 
                alt="certification image"
              />
            </div>
        </Paper>
      </Grid>
    </Grid>
  );

  return (
    <>
      <LogoWrapper title={groupInfo.name} >
      </LogoWrapper>
      
      <Contents>
        {
          groupInfo._id 
          ? <>
            <CardMedia 
              className={classes.media}
              image={imgUrl}
              title="certification"
              onClick={handleOpen}
            />
            <DetailContent content={groupInfo} />
            <DetailCourse courseList={courseList} />
          </>
          : '잘못된 접속입니다.'
        }
        
      </Contents>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}

export default connect(
  (state) => ({
    courseInfo: state.list.get('courseInfo').toJS()
  }),
  (dispatch) => ({
    ListActions: bindActionCreators(listActions, dispatch) 
  })
)(SearchDetail);