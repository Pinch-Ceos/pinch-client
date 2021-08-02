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

const Bookmark = () => {
  const dispatch = useDispatch();
  const { mails, hasMoreMails, loadMailLoading, me } = useSelector(
    (state) => state
  );
  const [header, setHeader] = useState('');
  const [cookie, setCookie, removeCookie] = useCookies(['Token']);
  const [page, setPage] = useState(2);

  useEffect(() => {
    setHeader(me.user_name.concat('님의 저장한 뉴스레터'));
    dispatch({
      type: LOAD_BOOKMARK_REQUEST,
      page: 1,
      token: cookie.Token,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMoreMails && !loadMailLoading) {
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
  }, [mails.length, hasMoreMails, loadMailLoading]);

  const ChangeBody = () => {
    if (me.bookmark_num !== 0) {
      return <CardList data={mails} header={header} />;
    } else {
      return (
        <>
          <Header>{header}</Header>
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
      <AppLayout>
        {ChangeBody()}
        {console.log(me.bookmark_num)}
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const Token = context.req.headers.cookie.substr(6);
    // const Token = context.req.headers.cookie['Token'];
    console.log(Token);
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
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

const Header = styled.div`
  margin-left: 5px;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2rem;
  color: #171920;
`;
