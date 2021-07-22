import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../../component/AppLayout';
import CardList from '../../component/CardList';
import { LOAD_MAIL_REQUEST, LOAD_MY_INFO_REQUEST } from '../../reducers';
import wrapper from '../../store/configureStore';

const Mail = () => {
  const router = useRouter();
  const { newsletter } = router.query;
  const dispatch = useDispatch();
  const { mails, subscribe_list, hasMoreMails, loadMailLoading } = useSelector(
    (state) => state
  );
  const [header, setHeader] = useState('');
  const [cookie, setCookie, removeCookie] = useCookies(['Token']);

  useEffect(() => {
    console.log(newsletter);
    if (newsletter === 'inbox') {
      // dispatch({
      //   type: LOAD_MAIL_REQUEST,
      //   data: '',
      //   token: cookie.Token,
      // });
      setHeader('전체 뉴스레터');
    } else {
      // dispatch({
      //   type: LOAD_MAIL_REQUEST,
      //   data: newsletter,
      //   token: cookie.Token,
      // });
      console.log(
        subscribe_list.find((v) => v.email_address === newsletter).name
      );
      setHeader(
        subscribe_list.find((v) => v.email_address === newsletter).name
      );
    }
  }, [newsletter]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMoreMails && !loadMailLoading) {
          if (newsletter === 'inbox') {
            dispatch({
              type: LOAD_MAIL_REQUEST,
              data: '',
              token: cookie.Token,
            });
          } else {
            dispatch({
              type: LOAD_MAIL_REQUEST,
              data: newsletter,
              token: cookie.Token,
            });
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [newsletter, mails.length, hasMoreMails, loadMailLoading]);

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
    if (context.params.newsletter === 'inbox') {
      context.store.dispatch({
        type: LOAD_MAIL_REQUEST,
        data: '',
        token: Token,
      });
    } else {
      context.store.dispatch({
        type: LOAD_MAIL_REQUEST,
        data: context.params.newsletter,
        token: Token,
      });
    }
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);
export default Mail;
