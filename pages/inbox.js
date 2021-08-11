import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../component/AppLayout';
import CardList from '../component/CardList';
import { LOAD_MAIL_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers';
import wrapper from '../store/configureStore';
import styled from 'styled-components';
import Image from 'next/image';
import Modal from '../component/Modal';
import { getCookie } from './subscription/[newsletter]';
import { LoadingOutlined } from '@ant-design/icons';
import Header from '../component/TopBar';

const Inbox = () => {
  const dispatch = useDispatch();
  const { mails, hasMoreMails, loadMailLoading, me } = useSelector(
    (state) => state
  );
  const [header, setHeader] = useState('');
  const [cookie, setCookie, removeCookie] = useCookies(['Token', 'Filter']);
  const [page, setPage] = useState(2);

  useEffect(() => {
    setHeader(me.user_name.concat('님의 인박스'));
    setPage(2);
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMoreMails && !loadMailLoading) {
          console.log(cookie.Filter);
          dispatch({
            type: LOAD_MAIL_REQUEST,
            data: '',
            page: page,
            token: cookie.Token,
            read: cookie.Filter,
          });
          console.log(page);
          setPage((prev) => prev + 1);
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mails.length, hasMoreMails, loadMailLoading, cookie.Filter]);

  const ChangeBody = () => {
    console.log('qwertyu');
    console.log(me.subscription_num);
    if (
      !me.subscription_num ||
      me.subscription_num === 0 ||
      mails.length === 0
    ) {
      console.log('모달모달');
      return (
        <>
          <HeaderWrapper>{header}</HeaderWrapper>
          <EmptyContainer>
            <Modal sub={me.subscription_num} />
            <Image src={'/design/emptyInbox.png'} width="252" height="263" />
            <TextLabel>아무것도 없네요!</TextLabel>
          </EmptyContainer>
        </>
      );
    } else {
      return (
        <>
          <CardList data={mails} header={header} setPage={setPage} />
          <LoadingWrapper>
            {loadMailLoading ? <LoadingOutlined /> : null}
          </LoadingWrapper>
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
    const Filter = getCookie(context.req.headers.cookie, 'Filter')
      ? getCookie(context.req.headers.cookie, 'Filter')
      : '';
    console.log(Token);
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
      token: Token,
    });
    context.store.dispatch({
      type: LOAD_MAIL_REQUEST,
      data: '',
      page: 1,
      token: Token,
      read: Filter,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);
export default Inbox;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 300%;
  margin: 20px;
`;

const EmptyContainer = styled.div`
  margin-top: 206px;
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
