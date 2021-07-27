import React from 'react';
import { Card } from 'antd';
import { Meta } from 'antd/lib/list/Item';
import Router from 'next/router';
import { ADD_BOOKMARK_REQUEST, DELETE_BOOKMARK_REQUEST } from '../reducers';
import Image from 'next/image';
import moment from 'moment';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

const ImageCard = ({ item }) => {
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(['Token']);
  const onCardClick = (item) => () => {
    Router.push(
      `/letterview/${item.id}?name=${item.name}&subject=${item.subject}&bookmark_id=${item.bookmark_id}`
    );
  };
  const onBookmarkClick = (item) => {
    console.log(item);
    if (item.bookmark_id) {
      dispatch({
        type: DELETE_BOOKMARK_REQUEST,
        data: item.bookmark_id,
        token: cookie.Token,
      });
    } else {
      dispatch({
        type: ADD_BOOKMARK_REQUEST,
        data: item.id,
        token: cookie.Token,
      });
    }
  };
  return item.bookmark_id ? (
    <UnreadCard
      hoverable
      onClick={onCardClick(item)}
      style={{ hight: 200, border: 'none' }}
      cover={
        <img
          alt="cover"
          src={item.image}
          style={{
            height: 146,
            objectFit: 'fill',
            borderRadius: '15px',
          }}
        />
      }
      actions={[
        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            marginLeft: 8,
            textAlign: 'left',
          }}
        >
          {moment(item.datetime).format('YYYY.MM.DD')}
          <br />
          {item.name}
        </div>,
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: 24,
          }}
        >
          <Image
            src={'/design/bookmarked.png'}
            width="30px"
            height="30px"
            onClick={(event) => {
              event.stopPropagation();
              onBookmarkClick(item);
            }}
          />
        </div>,
      ]}
    >
      <StyledMeta title={item.subject} description={item.snippet} />
    </UnreadCard>
  ) : item.read ? (
    <ReadCard
      hoverable
      onClick={onCardClick(item)}
      style={{ hight: 200, border: 'none' }}
      cover={
        <img
          alt="cover"
          src={item.image}
          style={{
            height: 146,
            objectFit: 'fill',
            borderRadius: '15px',
          }}
        />
      }
      actions={[
        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            marginLeft: 8,
            textAlign: 'left',
          }}
        >
          {moment(item.datetime).format('YYYY.MM.DD')}
          <br />
          {item.name}
        </div>,
        <StyledBookmark>
          <Image
            src={'/design/bookmark.png'}
            width="30px"
            height="30px"
            onClick={(event) => {
              event.stopPropagation();
              onBookmarkClick(item);
            }}
          />
        </StyledBookmark>,
      ]}
    >
      <StyledMeta title={item.subject} description={item.snippet} />
    </ReadCard>
  ) : (
    <UnreadCard
      hoverable
      onClick={onCardClick(item)}
      style={{ hight: 200, border: 'none' }}
      cover={
        <img
          alt="cover"
          src={item.image}
          style={{
            height: 146,
            objectFit: 'fill',
            borderRadius: '15px',
          }}
        />
      }
      actions={[
        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            marginLeft: 8,
            textAlign: 'left',
          }}
        >
          {moment(item.datetime).format('YYYY.MM.DD')}
          <br />
          {item.name}
        </div>,
        <StyledBookmark>
          <Image
            src={'/design/bookmark.png'}
            width="30px"
            height="30px"
            onClick={(event) => {
              event.stopPropagation();
              onBookmarkClick(item);
            }}
          />
        </StyledBookmark>,
      ]}
    >
      <StyledMeta title={item.subject} description={item.snippet} />
    </UnreadCard>
  );
};

export default ImageCard;

export const StyledBookmark = styled.div`
  opacity: 0;
  display: flex;
  justify-content: flex-end;
  margin-right: 24px;
`;

export const UnreadCard = styled(Card)`
  border-radius: 15px;
  &:hover {
    div {
      opacity: 1;
    }
  }
  .ant-card-body {
    padding: 8px;
  }
  .ant-card-actions {
    border-radius: 15px;
  }
  .ant-card-actions > li:not(:last-child) {
    border: none;
  }
`;

export const ReadCard = styled(Card)`
  opacity: 0.4;
  border-radius: 15px;
  &:hover {
    opacity: 1;
    div {
      opacity: 1;
    }
  }
  .ant-card-body {
    padding: 8px;
  }
  .ant-card-actions {
    border-radius: 15px;
  }
  .ant-card-actions > li:not(:last-child) {
    border: none;
  }
`;

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
