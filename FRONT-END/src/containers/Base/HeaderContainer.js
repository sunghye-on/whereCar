import React, { Component } from 'react';
import Header, { LoginButton } from 'components/Base/Header';
import { connect } from 'react-redux';

function HeaderContainer({ visible }) {
  if(!visible) return null;

  return (
      <Header>
          <LoginButton/>
      </Header>
  );
};

export default connect(
  (state) => ({
      visible: state.base.getIn(['header', 'visible'])
  }),
  (dispatch) => ({

  })
)(HeaderContainer);