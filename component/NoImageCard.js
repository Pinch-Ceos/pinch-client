import React, { useCallback } from 'react';
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
import {
  StyledBookmark,
  UnreadCard,
  ReadCard,
  ActionsWrapper,
  SenderWrapper,
  NameWrapper,
  ImageWrapper,
} from './ImageCard';
import SubscriptionIcon from './SubscriptionIcon';

const NoImageCard = ({ item }) => {
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(['Token']);
  const onCardClick = (item) => () => {
    Router.push(`/letterview/${item.id}`);
  };
  const onBookmarkClick = useCallback((item) => {
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
  }, []);
  return item.bookmark_id ? (
    <UnreadCard
      hoverable
      onClick={onCardClick(item)}
      actions={[
        <ActionsWrapper>
          {moment(item.datetime).format('YYYY.MM.DD')}
          <br />
          <SenderWrapper>
            <SubscriptionIcon header={item.name} size={'false'} />
            <NameWrapper>{item.name}</NameWrapper>
          </SenderWrapper>{' '}
        </ActionsWrapper>,
        <ImageWrapper>
          <Image
            src={'/design/bookmarked.png'}
            width="30px"
            height="30px"
            onClick={(event) => {
              event.stopPropagation();
              onBookmarkClick(item);
            }}
          />
        </ImageWrapper>,
      ]}
    >
      <StyeldMeta
        avatar={
          <div>
            <StyledAvatar>{item.name[0]}</StyledAvatar>
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
      actions={[
        <ActionsWrapper>
          {moment(item.datetime).format('YYYY.MM.DD')}
          <br />
          <SenderWrapper>
            <SubscriptionIcon header={item.name} size={'false'} />
            <NameWrapper>{item.name}</NameWrapper>
          </SenderWrapper>{' '}
        </ActionsWrapper>,
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
          <div>
            <StyledAvatar>{item.name[0]}</StyledAvatar>
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
      actions={[
        <ActionsWrapper>
          {moment(item.datetime).format('YYYY.MM.DD')}
          <br />
          <SenderWrapper>
            <SubscriptionIcon header={item.name} size={'false'} />
            <NameWrapper>{item.name}</NameWrapper>
          </SenderWrapper>{' '}
        </ActionsWrapper>,
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
          <div>
            <StyledAvatar>{item.name[0]}</StyledAvatar>
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
  margin-top: 16px;
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
    height: 54px;
    overflow: hidden;
    vertical-align: center;
    text-overflow: ellipsis;
    word-break: break-all;
    font-size: 18px;
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
    font-family: 'Sans Neo Regular';
    font-size: 14px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;

const StyledAvatar = styled(Avatar)`
  width: 36px;
  height: 36px;
`;
