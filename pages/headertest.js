import React from 'react';
import Image from 'next/image';
import { Avatar } from 'antd';
import Router from 'next/router';
const Header = () => {
  const onClickMark = () => {
    Router.push(`/inbox`);
  };
  const onClickAvatar = () => {
    Router.push(`/profile`);
  };
  return (
    <div
      style={{
        display: 'flex',
        padding: '10px',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ cursor: 'pointer' }}>
        <Image
          onClick={onClickMark}
          src={'/design/pinchmark.png'}
          width="60px"
          height="30px"
        />
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginTop: '5px', cursor: 'pointer' }}>
          <Image src={'/design/alarm.png'} width="21px" height="21px" />
        </div>
        <div style={{ marginLeft: '10px', cursor: 'pointer' }}>
          <Avatar onClick={onClickAvatar}>E</Avatar>
        </div>
      </div>
    </div>
  );
};
export default Header;
