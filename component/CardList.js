import { List, Card } from 'antd';
import React from 'react';
import ModalWindow from '../component/Modal';
import ImageCard from './ImageCard';
import NoImageCard from './NoImageCard';
import styled from 'styled-components';

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
        <StyledItem
          style={{
            marginTop: '20px',
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          {item.image ? <ImageCard item={item} /> : <NoImageCard item={item} />}
        </StyledItem>
      )}
    />
  );
};
export default CardList;

const StyledItem = styled(List.Item)`
  &:hover {
    .ant-list-item-meta-title {
      text-decoration: underline;
    }
  }
`;
