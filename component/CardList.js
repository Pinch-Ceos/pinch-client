import { List, Card, Button } from 'antd';
import { Meta } from 'antd/lib/list/Item';
import Router from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ModalWindow from '../component/Modal';
import {
  ADD_BOOKMARK_REQUEST,
  DELETE_BOOKMARK_REQUEST,
  LOAD_DETAIL_REQUEST,
} from '../reducers';
import Image from 'next/image';
import Avatar from 'antd/lib/avatar/avatar';
import moment from 'moment';
import Link from 'next/link';
import ImageCard from './ImageCard';
import NoImageCard from './NoImageCard';
const CardList = ({ data, header }) => {
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
  const card = (item) => {
    if (item.bookmark_id) {
      return <ImageCard item={item} />;
    }
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
          {/* {card(item)} */}
          {item.image ? (
            <ImageCard item={item} />
          ) : (
            <NoImageCard item={item} />
            // <StyledCard
            //   hoverable
            //   onClick={onCardClick(item)}
            //   style={{ hight: 200, border: 'none' }}
            //   cover={
            //     <img
            //       alt="cover"
            //       src={item.image}
            //       style={{
            //         height: 146,
            //         objectFit: 'fill',
            //         borderRadius: '15px',
            //       }}
            //     />
            //   }
            //   actions={[
            //     <div
            //       style={{
            //         display: 'flex',
            //         justifyContent: 'start',
            //         marginLeft: 8,
            //         textAlign: 'left',
            //       }}
            //     >
            //       {moment(item.datetime).format('YYYY.MM.DD')}
            //       <br />
            //       {item.name}
            //     </div>,
            //     item.bookmark_id ? (
            //       <div
            //         style={{
            //           display: 'flex',
            //           justifyContent: 'flex-end',
            //           marginRight: 24,
            //         }}
            //       >
            //         <Image
            //           src={'/design/bookmarked.png'}
            //           width="30px"
            //           height="30px"
            //           onClick={(event) => {
            //             event.stopPropagation();
            //             onBookmarkClick(item);
            //           }}
            //         />
            //       </div>
            //     ) : (
            //       <StyledBookmark>
            //         <Image
            //           src={'/design/bookmark.png'}
            //           width="30px"
            //           height="30px"
            //           onClick={(event) => {
            //             event.stopPropagation();
            //             onBookmarkClick(item);
            //           }}
            //         />
            //       </StyledBookmark>
            //     ),
            //   ]}
            // >
            //   <StyledMeta title={item.subject} description={item.snippet} />
            // </StyledCard>
            // <StyledCard
            //   hoverable
            //   onClick={onCardClick(item)}
            //   style={{ border: 'none' }}
            //   actions={[
            //     <div
            //       style={{
            //         display: 'flex',
            //         justifyContent: 'start',
            //         marginLeft: 8,
            //       }}
            //     >
            //       {moment(item.datetime).format('YYYY.MM.DD')}
            //       <br />
            //       {item.name}
            //     </div>,
            //     item.bookmark_id ? (
            //       <div
            //         style={{
            //           display: 'flex',
            //           justifyContent: 'flex-end',
            //           marginRight: 24,
            //         }}
            //       >
            //         <Image
            //           src={'/design/bookmarked.png'}
            //           width="30px"
            //           height="30px"
            //           onClick={(event) => {
            //             event.stopPropagation();
            //             onBookmarkClick(item);
            //           }}
            //         />
            //       </div>
            //     ) : (
            //       <StyledBookmark>
            //         <Image
            //           src={'/design/bookmark.png'}
            //           width="30px"
            //           height="30px"
            //           onClick={(event) => {
            //             event.stopPropagation();
            //             onBookmarkClick(item);
            //           }}
            //         />
            //       </StyledBookmark>
            //     ),
            //   ]}
            // >
            //   <StyeldMeta2
            //     avatar={
            //       <div style={{ marginTop: 16 }}>
            //         <Avatar style={{ width: 36, height: 36 }}>
            //           {item.name[0]}
            //         </Avatar>
            //       </div>
            //     }
            //     title={item.subject}
            //     description={item.snippet}
            //   />
            // </StyledCard>
          )}
        </List.Item>
      )}
    />
  );
};
export default CardList;

const StyeldMeta2 = styled(Meta)`
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
  // opacity: 0.5;
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
  .ant-card-actions > li > span {
    // opacity: 0;
    pointer-event: none;
    &:hover {
      color: rgba(0, 0, 0, 0.45);
    }
  }
`;
const StyledBookmark = styled.div`
  opacity: 0;
  display: flex;
  justify-content: flex-end;
  margin-right: 24px;
`;
