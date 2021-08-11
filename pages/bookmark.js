import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../component/AppLayout';
import CardList from '../component/CardList';
import { LOAD_BOOKMARK_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers';
import wrapper from '../store/configureStore';
import styled from 'styled-components';
import Image from 'next/image';
import { getCookie } from './subscription/[newsletter]';
import { LoadingWrapper } from './inbox';
import { LoadingOutlined } from '@ant-design/icons';
import Header from '../component/TopBar';

const Bookmark = () => {
  const dispatch = useDispatch();
  const { mails, hasMoreMails, loadMailLoading, me, loading } = useSelector(
    (state) => state
  );
  const [header, setHeader] = useState('');
  const [cookie, setCookie, removeCookie] = useCookies(['Token']);
  const [page, setPage] = useState(2);

  useEffect(() => {
    setHeader(me.user_name.concat('님의 저장한 뉴스레터'));
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 600
      ) {
        if (hasMoreMails && !loadMailLoading && !loading) {
          dispatch({
            type: LOAD_BOOKMARK_REQUEST,
            page: page,
            token: cookie.Token,
          });
          setPage((prev) => prev + 1);
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mails.length, hasMoreMails, loadMailLoading, loading]);

  const ChangeBody = () => {
    if (me.bookmark_num !== 0) {
      return (
        <>
          <CardList data={mails} header={header} setPage={setPage} />
          <LoadingWrapper>
            {loadMailLoading ? <LoadingOutlined /> : null}
          </LoadingWrapper>
        </>
      );
    } else {
      return (
        <>
          <HeaderWrapper>{header}</HeaderWrapper>
          <EmptyContainer>
            <Image src={'/design/emptyBookmark.png'} width="383" height="352" />
            <TextLabel>아직 저장한 뉴스레터가 없어요!</TextLabel>
          </EmptyContainer>
        </>
      );
    }
  };

  return (
    <>
      <Header />
      <AppLayout>{ChangeBody()}</AppLayout>
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
      type: LOAD_BOOKMARK_REQUEST,
      page: 1,
      token: Token,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Bookmark;

const EmptyContainer = styled.div`
  margin-top: 125px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextLabel = styled.div`
  font-weight: normal;
  font-size: 1.5rem;
  line-height: 1.875rem;
  text-align: center;
  color: #999999;
  margin-bottom: 651px;
  margin-top: 19px;
`;

const HeaderWrapper = styled.div`
  margin-left: 5px;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2rem;
  color: #171920;
`;
