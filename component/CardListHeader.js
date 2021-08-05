import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';

const CardListHeader = ({ header }) => {
  const router = useRouter();
  const address = router.pathname.split('/')[1];
  if (address === 'subscription') {
    return (
      <div>
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
      </div>
    );
  }
  return header;
};

export default CardListHeader;
