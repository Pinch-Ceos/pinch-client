import { List, Card } from 'antd';
import React from 'react';
import ImageCard from './ImageCard';
import NoImageCard from './NoImageCard';
import styled from 'styled-components';
import CardListHeader from './CardListHeader';

const CardList = ({ data, header, setPage }) => {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 4,
      }}
      style={{
        backgroundColor: 'white',
        border: 'none',
        width: '100%',
      }}
      header={<CardListHeader header={header} setPage={setPage} />}
      dataSource={data}
      renderItem={(item) => (
        <StyledItem key={item.id}>
          {item.image ? <ImageCard item={item} /> : <NoImageCard item={item} />}
        </StyledItem>
      )}
    />
  );
};
export default CardList;

const StyledItem = styled(List.Item)`
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  &:hover {
    .ant-list-item-meta-title {
      text-decoration: underline;
    }
  }
`;
