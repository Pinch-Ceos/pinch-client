import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Router from 'next/router';

const CardListHeader = ({ header, setPage }) => {
  const router = useRouter();
  const address = router.pathname.split('/')[1];
  const [cookie, setCookie, removeCookie] = useCookies(['Filter']);
  const [toggle, setToggle] = useState(false);

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
  });

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            <Image
              src={'/design/subscriptionIcon.png'}
              width="36px"
              height="36px"
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '30px',
              marginLeft: 10,
            }}
          >
            {header}
          </div>
        </div>
        <div style={{ cursor: 'pointer' }}>{filterToggle()}</div>
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
            fontSize: '20px',
            marginLeft: 10,
          }}
        >
          {header}
        </div>
        <div style={{ cursor: 'pointer' }}>{filterToggle()}</div>
      </div>
    );
  }
  return <div style={{ fontSize: '20px' }}>{header}</div>;
};

export default CardListHeader;
