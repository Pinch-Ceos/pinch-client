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

const Inbox = () => {
  const dispatch = useDispatch();
  const { mails, hasMoreMails, loadMailLoading, me } = useSelector(
    (state) => state
  );
  const [header, setHeader] = useState('');
  const [cookie, setCookie, removeCookie] = useCookies(['Token']);
  const [page, setPage] = useState(2);

  useEffect(() => {
    setHeader(me.user_name.concat('전체 뉴스레터'));
    dispatch({
      type: LOAD_MAIL_REQUEST,
      data: '',
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
            type: LOAD_MAIL_REQUEST,
            data: '',
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
    if (me.subscription_num === 0 || mails === null) {
      return (
        <>
          <Header>{header}</Header>
          <EmptyContainer>
            <Modal />
            <Image src={'/design/emptyInbox.png'} width="252" height="263" />
            <TextLabel>아무것도 없네요!</TextLabel>
          </EmptyContainer>
        </>
      );
    } else {
      return <CardList data={mails} header={header} />;
    }
  };

  return (
    <>
      <AppLayout>{ChangeBody()}</AppLayout>
      {console.log(me.subscription_num)}
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
export default Inbox;

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

const Header = styled.div`
  margin-left: 5px;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2rem;
  color: #171920;
`;
