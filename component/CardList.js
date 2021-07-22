import { List, Card } from 'antd';
import { Meta } from 'antd/lib/list/Item';
import Router from 'next/router';
import React from 'react';
import { BsFillBookmarkFill } from 'react-icons/bs';
import styled from 'styled-components';
import ModalWindow from '../component/Modal';

const StyledMeta = styled(Meta)`
  .ant-list-item-meta-title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: box;
    margin-top: 4px;
    height: 44px;
    overflow: hidden;
    vertical-align: center;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .ant-list-item-meta-description {
    display: -webkit-box;
    display: -ms-flexbox;
    display: box;
    height: 44px;
    margin-top: 8px;
    overflow: hidden;
    vertical-align: top;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;
const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 8px;
  }
`;

const CardList = ({ data, header }) => {
  const onCardClick = () => {
    Router.push('/newsletterview');
  };
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
          style={{ marginTop: '20px', marginLeft: 10, marginRight: 10 }}
        >
          <StyledCard
            onClick={onCardClick}
            style={{ hight: 200, border: 'none' }}
            cover={
              <img
                alt="example"
                src={item.image}
                style={{
                  height: 146,
                  objectFit: 'cover',
                  borderRadius: '15px',
                }}
              />
            }
            actions={[
              <div style={{ marginTop: 10 }}>
                <BsFillBookmarkFill
                  key="bookmark"
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginLeft: 'auto',
                    marginRight: '1em',
                    width: 20,
                    height: 20,
                  }}
                />
              </div>,
            ]}
          >
            <StyledMeta title={item.subject} description={item.snippet} />
          </StyledCard>
        </List.Item>
      )}
    />
  );
};
export default CardList;
