import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const CardListHeader = ({ header }) => {
  const router = useRouter();
  const address = router.pathname.split('/')[1];
  const [toggle, setToggle] = useState();

  const onClickToggle = () => {
    setToggle(!toggle);
    localStorage.setItem('filterToggle', JSON.stringify(!toggle));
  };

  useEffect(() => {
    if (localStorage.getItem('filterToggle') === 'true') {
      setToggle(true);
    } else {
      setToggle(false);
    }
    console.log(toggle);
  }, []);

  const filterToggle = () => {
    console.log(toggle);
    if (toggle) {
      return (
        <Image
          style={{ cursor: 'pointer' }}
          src={'/design/filterOn.png'}
          width="30px"
          height="30px"
          onClick={onClickToggle}
        />
      );
    }
    return (
      <Image
        style={{ cursor: 'pointer' }}
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
        <div>{filterToggle()}</div>
      </div>
    );
  }
  return header;
};

export default CardListHeader;
