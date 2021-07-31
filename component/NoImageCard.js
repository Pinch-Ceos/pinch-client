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
import Avatar from 'antd/lib/avatar/avatar';
import { StyledBookmark, UnreadCard, ReadCard } from './ImageCard';

const NoImageCard = ({ item }) => {
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(['Token']);
  const onCardClick = (item) => () => {
    Router.push(`/letterview/${item.id}`);
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
      style={{ border: 'none' }}
      actions={[
        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            marginLeft: 8,
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
      <StyeldMeta
        avatar={
          <div style={{ marginTop: 16 }}>
            <Avatar style={{ width: 36, height: 36 }}>{item.name[0]}</Avatar>
          </div>
        }
        title={item.subject}
        description={item.snippet}
      />
    </UnreadCard>
  ) : item.read ? (
    <ReadCard
      hoverable
      onClick={onCardClick(item)}
      style={{ border: 'none' }}
      actions={[
        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            marginLeft: 8,
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
      <StyeldMeta
        avatar={
          <div style={{ marginTop: 16 }}>
            <Avatar style={{ width: 36, height: 36 }}>{item.name[0]}</Avatar>
          </div>
        }
        title={item.subject}
        description={item.snippet}
      />
    </ReadCard>
  ) : (
    <UnreadCard
      hoverable
      onClick={onCardClick(item)}
      style={{ border: 'none' }}
      actions={[
        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            marginLeft: 8,
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
      <StyeldMeta
        avatar={
          <div style={{ marginTop: 16 }}>
            <Avatar style={{ width: 36, height: 36 }}>{item.name[0]}</Avatar>
          </div>
        }
        title={item.subject}
        description={item.snippet}
      />
    </UnreadCard>
  );
};

export default NoImageCard;

const StyeldMeta = styled(Meta)`
  flex-direction: column;
  .ant-list-item-meta-content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .ant-list-item-meta-title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: box;
    margin-top: 12px;
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
    height: 66px;
    margin-top: 8px;
    margin-bottom: 60px;
    overflow: hidden;
    vertical-align: top;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;
