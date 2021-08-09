import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SubscriptionIcon from './SubscriptionIcon';
import { Tooltip } from 'antd';

const CardListHeader = ({ header, setPage }) => {
  const router = useRouter();
  const address = router.pathname.split('/')[1];
  const [cookie, setCookie, removeCookie] = useCookies(['Filter']);
  const [toggle, setToggle] = useState(false);
  const { num_of_email } = useSelector((state) => state);

  const onClickToggle = () => {
    setToggle(!toggle);
    setPage(2);
    if (!toggle) {
      setCookie('Filter', 'True', { path: '/' });
    } else {
      setCookie('Filter', 'False', { path: '/' });
    }
    if (address === 'subscription') {
      Router.push(`/subscription/${router.query.newsletter}`);
    } else if (address === 'inbox') {
      Router.push('/inbox');
    }
  };

  useEffect(() => {
    if (cookie['Filter'] === 'True') {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, []);

  const filterToggle = () => {
    if (toggle) {
      return (
        <Image
          src={'/design/filterOn.png'}
          width="30px"
          height="30px"
          onClick={onClickToggle}
        />
      );
    }
    return (
      <Image
        src={'/design/filterOff.png'}
        width="30px"
        height="30px"
        onClick={onClickToggle}
      />
    );
  };
  if (address === 'subscription') {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex' }}>
              {/* <Image
                src={'/design/subscriptionIcon.png'}
                width="36px"
                height="36px"
              /> */}
              <SubscriptionIcon header={header} size={'true'} />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '30px',
                marginLeft: 10,
                fontWeight: 'bold',
              }}
            >
              {header}
            </div>
          </div>
          <Tooltip
            placement="topRight"
            title="읽지 않은 뉴스레터만 표시하는 기능이에요"
            color={'#FDFEFE'}
          >
            <div style={{ cursor: 'pointer', marginRight: 10 }}>
              {filterToggle()}
            </div>
          </Tooltip>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
          <Image src={'/design/frontnumber.png'} width="14px" height="18px" />
          <div style={{ fontSize: 20, marginLeft: 9 }}>
            {num_of_email > 99 ? `99+개` : `${num_of_email}개`}
          </div>
        </div>
      </div>
    );
  } else if (address === 'inbox') {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '24px',
            marginLeft: 10,
            fontWeight: 'bold',
          }}
        >
          {header}
        </div>
        <Tooltip
          placement="topRight"
          title="읽지 않은 뉴스레터만 표시하는 기능이에요"
          color={'#FDFEFE'}
        >
          <div style={{ cursor: 'pointer', marginRight: 10 }}>
            {filterToggle()}
          </div>
        </Tooltip>
      </div>
    );
  }
  return <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{header}</div>;
};

export default CardListHeader;
