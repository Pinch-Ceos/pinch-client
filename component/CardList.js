import { List, Card } from 'antd';
import { Meta } from 'antd/lib/list/Item';
import Router from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ModalWindow from '../component/Modal';
import { ADD_BOOKMARK_REQUEST, DELETE_BOOKMARK_REQUEST } from '../reducers';
import ImageCard from './ImageCard';
import NoImageCard from './NoImageCard';
const CardList = ({ data, header }) => {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
        xxl: 4,
      }}
      style={{
        backgroundColor: 'white',
        border: 'none',
        width: '100%',
      }}
      header={
        <div style={{ border: 0, marginLeft: '5px', fontSize: '17px' }}>
          {header}
          <ModalWindow />
        </div>
      }
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          style={{
            marginTop: '20px',
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          {item.image ? <ImageCard item={item} /> : <NoImageCard item={item} />}
        </List.Item>
      )}
    />
  );
};
export default CardList;
