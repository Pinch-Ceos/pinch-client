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
  const { view, viewInfo, me } = useSelector((state) => state);
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
    if (viewInfo && viewInfo.bookmark_id !== null) {
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
  }, [viewInfo]);
  return (
    <Container>
      <Header />
      <AppLayout>
        <Container1>
          <Container2>
            <Container3>
              <NameWrapper>{viewInfo && viewInfo.name}</NameWrapper>
              {viewInfo && viewInfo.bookmark_id !== null ? (
                <BookmarkWrapper>
                  <Image
                    src={'/design/bookmarked.png'}
                    width="44px"
                    height="44px"
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
                    onClick={(event) => {
                      event.stopPropagation();
                      onBookmarkClick();
                    }}
                  />
                </BookmarkWrapper>
              )}
            </Container3>
            <SubjectWrapper>{viewInfo && viewInfo.subject}</SubjectWrapper>
          </Container2>
          <StyledIframe srcDoc={`${view}`}></StyledIframe>
        </Container1>
      </AppLayout>
    </Container>
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

const Container = styled.div`
  margin-top: 48px;
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Container2 = styled.div`
  width: 100%;
`;

const Container3 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NameWrapper = styled.div`
  font-size: 30px;
`;

const SubjectWrapper = styled.div`
  margin-top: 5px;
  font-size: 20px;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 83vh;
  word-break: break-all;
  border: none;
  box-shadow: none;
  justify-content: center;
`;
