import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { media } from 'lib/styleUtils';
import { Paper } from '@material-ui/core';
// 로고
const ManagerPaper = styled(Paper)`
  width: 500px;
  height: 600px;
  ${media.wide`
      width: 500px;
      margin-right: 1rem;
  `}
  ${media.phone`
      width: 20rem;
      height: 500px;
      margin-top: 1rem;
  `}
`;
const ManagerBox = ({title, children, style}) => {
  return (
    <ManagerPaper elevation={3} style={style}>
      { children }
    </ManagerPaper>
  )
};

export default ManagerBox;