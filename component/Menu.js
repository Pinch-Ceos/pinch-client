import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const MenuLayout = () => {
  const [selectedInbox, setSelectedInbox] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState(false);
  const { me } = useSelector((state) => state);
  const router = useRouter();
  useEffect(() => {
    const menuSelector = router.pathname.split('/')[1];
    console.log(menuSelector);
    if (menuSelector === 'inbox') {
      setSelectedInbox(true);
    } else if (menuSelector === 'bookmark') {
      setSelectedBookmark(true);
    } else if (menuSelector === 'subscription') {
      setSelectedSubscription(true);
    }
  }, [router]);

  const onClickSub = (v) => () => {
    Router.push(`/subscription/${v.email_address}`);
  };
  const onClickInbox = () => {
    Router.push(`/inbox`);
  };
  const onClickBookmark = () => {
    Router.push(`/bookmark`);
  };
  const onClickSubscription = () => {
    setSelectedSubscription(!selectedSubscription);
  };
  const onClickMenuContainer = (e) => {
    e.stopPropagation();
    console.log('onClickMenuContainer');
  };
  const isSubSelected = (v) => {
    return router.query.newsletter === v.email_address;
  };
  return (
    <div style={{ margin: 10 }}>
      <MenuBar>
        <Menu onClick={onClickInbox} selected={selectedInbox}>
          <TextWrapper>
            <ImageWrapper>
              <Image src={'/design/emoji1.png'} width="18px" height="18px" />
            </ImageWrapper>
            <MenuText>Inbox</MenuText>
          </TextWrapper>
        </Menu>
        <Menu onClick={onClickSubscription} selected={selectedSubscription}>
          <TextWrapper>
            <ImageWrapper>
              <Image src={'/design/emoji2.png'} width="18px" height="18px" />
            </ImageWrapper>
            <MenuText>구독 중인 뉴스레터</MenuText>
          </TextWrapper>
          <MenuContainer
            onClick={onClickMenuContainer}
            selected={selectedSubscription}
          >
            {me.subscriptions.map((v) => (
              <SubMenu
                onClick={onClickSub(v)}
                subselected={isSubSelected(v)}
                selected={selectedSubscription}
              >
                {v.name}
                <div style={{ fontSize: 24, marginLeft: 6 }}>&#x2022;</div>
              </SubMenu>
            ))}
          </MenuContainer>
        </Menu>
        <Menu onClick={onClickBookmark} selected={selectedBookmark}>
          <TextWrapper>
            <ImageWrapper>
              <Image src={'/design/emoji3.png'} width="18px" height="18px" />
            </ImageWrapper>
            <MenuText>저장한 뉴스레터</MenuText>
          </TextWrapper>
        </Menu>
      </MenuBar>
    </div>
  );
};
export default MenuLayout;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MenuText = styled.div`
  font-size: 18px;
  // font-weight: bold;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

const MenuBar = styled.div`
  display: flex;
  flex-direction: column;
  // width: 280px;
  height: 100%;
  border-radius: 15px;
  background-color: white;
  z-index: 9999;
`;
const MenuContainer = styled.div`
  width: calc(100% + 40px);
  height: auto;
  display: ${(props) => (props.selected ? 'flex' : 'none')};
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 24px;
  background-color: white;
  position: relative;
  left: -20px;
  top: 13px;
`;
const Menu = styled.div`
  // display: flex;
  // align-items: center;
  height: auto;
  border-radius: 8px;
  border: none;
  text-align: left;
  font-weight: normal;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: ${(props) => (props.selected ? '#f3f3f3' : 'white')};
  color: ${(props) => (props.selected ? 'black' : '#C2C2C2')};
  :hover {
    background: #f3f3f3;
    color: black;
  }
  margin-bottom: 4px;
  position: relative;
  cursor: pointer;
`;

const SubMenu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: white;
  padding-left: 20px;
  padding-top: 14px;
  padding-bottom: 12px;
  height: 16px;
  font-size: 16px;
  display: ${(props) => (props.selected ? 'flex' : 'none')};
  color: ${(props) => (props.subselected ? 'black' : '#C2C2C2')};
  margin-bottom: 16px;
  position: relative;
  cursor: pointer;
  &:hover {
    color: black;
  }
  div {
    padding-left: 5px;
    color: blue;
    display: ${(props) => (props.subselected ? 'flex' : 'none')};
  }
`;
