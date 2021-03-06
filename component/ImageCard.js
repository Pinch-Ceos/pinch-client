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
import SubscriptionIcon from './SubscriptionIcon';

const ImageCard = ({ item }) => {
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
      onClick={onCardClick(item)}
      cover={<StyledImg alt="cover" src={item.image} />}
      actions={[
        <ActionsWrapper>
          {moment(item.datetime).format('YYYY.MM.DD')}
          <br />
          <SenderWrapper>
            <SubscriptionIcon header={item.name} size={'false'} />
            <NameWrapper>{item.name}</NameWrapper>
          </SenderWrapper>
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
      <StyledMeta title={item.subject} description={item.snippet} />
    </UnreadCard>
  ) : item.read ? (
    <ReadCard
      onClick={onCardClick(item)}
      cover={<StyledImg alt="cover" src={item.image} />}
      actions={[
        <ActionsWrapper>
          {moment(item.datetime).format('YYYY.MM.DD')}
          <br />
          <SenderWrapper>
            <SubscriptionIcon header={item.name} size={'false'} />
            <NameWrapper>{item.name}</NameWrapper>
          </SenderWrapper>
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
      <StyledMeta title={item.subject} description={item.snippet} />
    </ReadCard>
  ) : (
    <UnreadCard
      onClick={onCardClick(item)}
      cover={<StyledImg alt="cover" src={item.image} />}
      actions={[
        <ActionsWrapper>
          {moment(item.datetime).format('YYYY.MM.DD')}
          <br />
          <SenderWrapper>
            <SubscriptionIcon header={item.name} size={'false'} />
            <NameWrapper>{item.name}</NameWrapper>
          </SenderWrapper>
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
      <StyledMeta title={item.subject} description={item.snippet} />
    </UnreadCard>
  );
};

export default ImageCard;

export const SenderWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 13px;
  font-family: 'Sans Neo Regular';
`;

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-left: 8px;
  text-align: left;
  font-size: 12px;
  &:hover {
    color: rgba(0, 0, 0, 0.45);
  }
`;

export const StyledBookmark = styled.div`
  opacity: 0;
  display: flex;
  justify-content: flex-end;
  margin-right: 24px;
`;

export const UnreadCard = styled(Card)`
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    div {
      opacity: 1;
    }
    .ant-card-cover img {
      box-shadow: 0 1px 30px rgba(145, 145, 145, 0.2);
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
  border: none;
  opacity: 0.4;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    opacity: 1;
    div {
      opacity: 1;
    }
    .ant-card-cover img {
      box-shadow: 0 1px 30px rgba(145, 145, 145, 0.2);
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
    height: 44px;
    margin-top: 8px;
    overflow: hidden;
    vertical-align: top;
    text-overflow: ellipsis;
    word-break: break-all;
    font-family: 'Sans Neo Regular';
    font-size: 14px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

const StyledImg = styled.img`
  height: 146px;
  object-fit: fill;
`;

export const NameWrapper = styled.div`
  margin-left: 8px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 24px;
`;
