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
        // padding: '10px',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ cursor: 'pointer', marginTop: 1 }}>
        <Image
          onClick={onClickMark}
          src={'/design/pinchmark.png'}
          width="60px"
          height="27px"
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginTop: '7px', cursor: 'pointer' }}>
          <Image src={'/design/alarm.png'} width="21px" height="21px" />
        </div>
        <div
          style={{
            marginLeft: '10px',
            marginRight: '10px',
            cursor: 'pointer',
            verticalAlign: 'center',
          }}
        >
          <Avatar
            style={{
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              verticalAlign: 'center',
            }}
            onClick={onClickAvatar}
          >
            E
          </Avatar>
        </div>
      </div>
    </div>
  );
};
export default Header;
