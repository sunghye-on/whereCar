import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'redux/modules/base';
import { AdminWrapper } from '../components/Admin';
import { Maintain, HeaderContainer } from '../containers/Admin';
import { Route, Redirect } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const ContentWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

function Admin({ BaseActions, loggedIn }) {
  useEffect(() => {
    BaseActions.setHeaderVisibility(false);
    return () => {
      BaseActions.setHeaderVisibility(true);
    };
  }, [BaseActions]);

  return (
    <HeaderContainer>
      <ContentWrapper>
        <Route path="/admin/management" component={ Maintain } >
          {!loggedIn && <Redirect to="/" />}
        </Route>
      </ContentWrapper>
    </HeaderContainer>
  );
};

export default connect(
  (state) => ({
    loggedIn: state.user.get('logged')
  }),
  (dispatch) => ({
      BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Admin);