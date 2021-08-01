import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Container>
      <CenterContainer>
        <Logo>
          {/* <Image src={'/design/pinchmark.png'} width="" height="" /> */}
          putlogohere
        </Logo>
        <CenterBox>
          <Label>개인정보 처리방침</Label>
          <Label>서비스약관</Label>
          <Label>제휴문의</Label>
          <Label>Help & Support</Label>
        </CenterBox>
        <Label>Copyright © Pinch. All rights reserved </Label>
      </CenterContainer>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  width: 100%;
  height: 254px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #f9f9f9;
`;

const CenterContainer = styled.div`
  width: 545px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 47px;
  margin-bottom: 65px;
`;

const Logo = styled.div`
  height: 30px;
`;

const Label = styled.div`
  font-weight: normal;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #999999;
`;

const CenterBox = styled.div`
  border-bottom: 1px solid #c4c4c4;
  width: 100%;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
