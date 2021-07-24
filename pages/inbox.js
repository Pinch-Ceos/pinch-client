import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../component/AppLayout';
import CardList from '../component/CardList';
import { LOAD_MAIL_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers';
import wrapper from '../store/configureStore';

const Mail = () => {
  const dispatch = useDispatch();
  const { mails, hasMoreMails, loadMailLoading } = useSelector(
    (state) => state
  );
  const [header, setHeader] = useState('');
  const [cookie, setCookie, removeCookie] = useCookies(['Token']);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch({
      type: LOAD_MAIL_REQUEST,
      data: '',
      page: page,
      token: cookie.Token,
    });
    setPage((prev) => prev + 1);
    setHeader('전체 뉴스레터');
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
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mails.length, hasMoreMails, loadMailLoading]);

  return (
    <>
      <AppLayout>
        <CardList data={mails} header={header} />
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
    // context.store.dispatch({
    //     type: LOAD_MAIL_REQUEST,
    //     data: '',
    //     token: Token,
    //   });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);
export default Mail;
