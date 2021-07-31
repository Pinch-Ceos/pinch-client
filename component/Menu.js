import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const MenuLayout = () => {
  const [selectedInbox, setSelectedInbox] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState(false);
  const [selectedSub, setSelectedSub] = useState('');
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
          👀 Inbox
        </Menu>
        <Menu onClick={onClickSubscription} selected={selectedSubscription}>
          📚 구독 중인 뉴스레터
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
                <div>&#x25cf;</div>
              </SubMenu>
            ))}
          </MenuContainer>
        </Menu>
        <Menu onClick={onClickBookmark} selected={selectedBookmark}>
          📌 저장한 뉴스레터
        </Menu>
      </MenuBar>
    </div>
  );
};
export default MenuLayout;

const Dot = styled.div`
  color: blue;
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
  // width: 260px;
  width: 190%;
  /* height: ${(props) => (props.length + 1) * '32px' + '48'}; */
  height: auto;
  display: ${(props) => (props.selected ? 'flex' : 'none')};
  flex-direction: column;
  padding-top: 10px;
  background-color: white;
  position: relative;
  left: -20px;
  top: 13px;
`;
const Menu = styled.button`
  // width: 260px;
  // height: 50px;
  height: auto;
  border-radius: 8px;
  border: none;
  text-align: left;
  font-weight: bold;
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
  // width: 260px;
  width: 100%;
  background-color: white;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 16px;
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
