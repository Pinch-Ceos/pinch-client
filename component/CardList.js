import { List, Card } from 'antd';
import React from 'react';
import ImageCard from './ImageCard';
import NoImageCard from './NoImageCard';
import styled from 'styled-components';
import CardListHeader from './CardListHeader';

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
      header={<CardListHeader header={header} />}
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
