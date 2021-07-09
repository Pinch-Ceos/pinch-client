import React from 'react';
import AppLayout from '../component/AppLayout';
import CardList from '../component/CardList';

const test = () => {
  const cardHeader = '뉴스레터 전체목록';
  const cardData = [
    {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Card title',
      description: 'asdasdasdasdasdasdasdasasda',
    },
    {
      src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Card title',
      description: 'asdasdasdasdasdasdasdasasda',
    },
    {
      src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Card title',
      description: 'asdasdasdasdasdasdasdasasda',
    },
    {
      src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Card title',
      description: 'asdasdasdasdasdasdasdasasda',
    },
    {
      src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Card title',
      description: 'asdasdasdasdasdasdasdasasda',
    },
    {
      src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Card title',
      description: 'asdasdasdasdasdasdasdasasda',
    },
    {
      src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Card title',
      description: 'asdasdasdasdasdasdasdasasda',
    },
    {
      src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Card title',
      description: 'asdasdasdasdasdasdasdasasda',
    },
  ];

  return (
    <>
      <AppLayout>
        <CardList data={cardData} header={cardHeader} />
      </AppLayout>
    </>
  );
};

export default test;
