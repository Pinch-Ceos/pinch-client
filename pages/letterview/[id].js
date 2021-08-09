import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../component/AppLayout';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import {
  ADD_BOOKMARK_REQUEST,
  DELETE_BOOKMARK_REQUEST,
  LOAD_DETAIL_INFO_REQUEST,
  LOAD_DETAIL_REQUEST,
  LOAD_MY_INFO_REQUEST,
} from '../../reducers';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Image from 'next/image';
import styled from 'styled-components';
import { getCookie } from '../subscription/[newsletter]';
import Header from '../../component/TopBar';

const NewsLetterView = () => {
  const { view, viewInfo } = useSelector((state) => state);
  const router = useRouter();
  const data = router.query;
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(['Token']);

  useEffect(() => {
    dispatch({
      type: LOAD_DETAIL_INFO_REQUEST,
      token: cookie.Token,
      data: data.id,
    });
  }, [viewInfo && viewInfo.bookmark_id]);

  const onBookmarkClick = useCallback(() => {
    if (viewInfo.bookmark_id !== null) {
      dispatch({
        type: DELETE_BOOKMARK_REQUEST,
        data: viewInfo.bookmark_id,
        token: cookie.Token,
      });
    } else {
      dispatch({
        type: ADD_BOOKMARK_REQUEST,
        data: data.id,
        token: cookie.Token,
      });
    }
  }, []);
  return (
    <>
      <Header />
      <AppLayout>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '30px' }}>
                {viewInfo && viewInfo.name}
              </div>
              {viewInfo && viewInfo.bookmark_id !== null ? (
                <BookmarkWrapper>
                  <Image
                    src={'/design/bookmarked.png'}
                    width="44px"
                    height="44px"
                    style={{ boxShadow: '3px 3px 3px #000' }}
                    onClick={(event) => {
                      event.stopPropagation();
                      onBookmarkClick();
                    }}
                  />
                </BookmarkWrapper>
              ) : (
                <BookmarkWrapper>
                  <Image
                    src={'/design/bookmark.png'}
                    width="44px"
                    height="44px"
                    style={{ filter: 'drop-shadow(5px 5px 5px #000)' }}
                    onClick={(event) => {
                      event.stopPropagation();
                      onBookmarkClick();
                    }}
                  />
                </BookmarkWrapper>
              )}
            </div>
            <div style={{ marginTop: 5, fontSize: '20px' }}>
              {viewInfo && viewInfo.subject}
            </div>
          </div>
          <iframe
            style={{
              width: '100%',
              height: '83vh',
              wordBreak: 'break-all',
              border: 'none',
              boxShadow: 'none',
              justifyContent: 'center',
            }}
            srcDoc={`${view}`}
          ></iframe>
        </div>
      </AppLayout>
    </>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const Token = getCookie(context.req.headers.cookie, 'Token')
      ? getCookie(context.req.headers.cookie, 'Token')
      : '';
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
      token: Token,
    });
    context.store.dispatch({
      type: LOAD_DETAIL_REQUEST,
      token: Token,
      data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default NewsLetterView;

const BookmarkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: none;
  width: 44px;
  height: 44px;
  // box-shadow: 0 0 5px #b0b0b0;
  &:hover {
    transform: scale(1.2);
  }
`;
