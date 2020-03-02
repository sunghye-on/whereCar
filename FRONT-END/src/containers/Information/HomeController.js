import React from 'react';
import styled from 'styled-components';
import { ManagerBox } from 'components/Admin';

const ContentWrapper = styled.div`
  padding-top: 6rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export default function HomeController() {
  return (
    <ContentWrapper>
      <ManagerBox width={{wide: '600px', phone: '500px'}}>LEFT BOX</ManagerBox>
      <ManagerBox width={{wide: '300px'}} display={true}>RIGHT BOX</ManagerBox>
    </ContentWrapper>
  )
} 