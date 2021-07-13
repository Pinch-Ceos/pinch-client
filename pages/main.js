import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../component/AppLayout';
import CardList from '../component/CardList';

const Home = () => {
  const cardHeader = '뉴스레터 전체목록';
  const cardData = [
    {
      src: 'https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg',
      title: 'Card title',
      description:
        'asdasdasdasdasdasdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxasdasasda',
    },
    {
      src: 'https://i.pinimg.com/originals/4b/64/69/4b64690a8654155e6e799031fc2d5a19.jpg',
      title:
        'Card titleCard titlCard titlCard titlvCard titlCard titlCard titlCard titlCard titlCard titlCard titlCard titlCard titlCard titlCard titleCard titlCard titlCard titlvCard titlCard titlCard titlCard titlCard titlCard titlCard titlCard titlCard titlCard titl',
      description:
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    },
    {
      src: 'https://1.bp.blogspot.com/-S7hP-_bf7o8/WWZy7CRaT3I/AAAAAAAByHE/wtoIBrfrBCciHVLM5xAopxFVpYIeTN6-ACLcBGAs/s1600/funny-cat-267-01.jpg',
      title: 'Card title',
      description: 'asdasdasdasdasdasdasdasasda',
    },
    {
      src: 'https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg',
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
