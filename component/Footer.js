import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Container>
      <CenterContainer>
        <Logo>
          <Image src={'/design/pinchmark.png'} width="80" height="22" />
          {/* putlogohere */}
        </Logo>
        <CenterBox>
          <a
            href="https://www.notion.so/Pinch-7f54905428e6446a8a94fb815c4c6d05"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Label>개인정보 처리방침</Label>
          </a>
          <a
            href="https://www.notion.so/774c59a6e62441c5b3de8304d7a55d4e"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Label>서비스약관</Label>
          </a>
          <a
            href="https://www.notion.so/e2792527e1874140af414986d03bda51"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Label>제휴문의</Label>
          </a>
          <a
            href="https://www.notion.so/a9360c46281b4af88cafccd2bd3779f0"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Label>Help & Support</Label>
          </a>
        </CenterBox>
        <Label>Copyright © Pinch. All rights reserved </Label>
      </CenterContainer>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  // width: 100%;
  widht: 100vw;
  height: 254px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #f9f9f9;
`;

const CenterContainer = styled.div`
  // width: 545px;
  width: 90vw;
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
  width: 90vw;
  max-width: 545px;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
