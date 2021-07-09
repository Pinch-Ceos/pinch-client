import React from 'react';
import AppLayout from '../component/AppLayout';
import CardList from '../component/CardList';

const Home = () => {
  const cardHeader = '뉴스레터 전체목록';
  const cardData = [
    {
      src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Card title',
      description: 'asdasdasdasdasdasdasdasasda',
    },
    {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Card title',
      description: 'asdasdasdasdasdasdasdasasda',
    },
    {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Card title',
      description: 'asdasdasdasdasdasdasdasasda',
    },
    {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Card title',
      description: 'asdasdasdasdasdasdasdasasda',
    },
    {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Card title',
      description: 'asdasdasdasdasdasdasdasasda',
    },
    {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Card title',
      description: 'asdasdasdasdasdasdasdasasda',
    },
    {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Card title',
      description: 'asdasdasdasdasdasdasdasasda',
    },
    {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
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

export default Home;
