import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../../component/AppLayout';
import CardList from '../../component/CardList';
import { LOAD_MAIL_REQUEST, LOAD_MY_INFO_REQUEST } from '../../reducers';
import wrapper from '../../store/configureStore';
import { LoadingWrapper } from '../inbox';
import { LoadingOutlined } from '@ant-design/icons';
import Header from '../../component/TopBar';

const Subscription = () => {
  const router = useRouter();
  const { newsletter } = router.query;
  const dispatch = useDispatch();
  const { mails, me, hasMoreMails, loadMailLoading, loading } = useSelector(
    (state) => state
  );
  const [header, setHeader] = useState('');
  const [cookie, setCookie, removeCookie] = useCookies(['Token', 'Filter']);
  const [page, setPage] = useState(2);

  useEffect(() => {
    setHeader(
      me.subscriptions.find((v) => v.email_address === newsletter).name
    );
  }, [newsletter]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 600
      ) {
        if (hasMoreMails && !loadMailLoading && !loading) {
          dispatch({
            type: LOAD_MAIL_REQUEST,
            data: newsletter,
            page: page,
            token: cookie.Token,
            read: cookie.Filter,
          });
          setPage((prev) => prev + 1);
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [
    newsletter,
    mails.length,
    hasMoreMails,
    loadMailLoading,
    loading,
    cookie.Filter,
  ]);
  return (
    <>
      <Header />
      <AppLayout>
        <CardList data={mails} header={header} setPage={setPage} />
        <LoadingWrapper>
          {loadMailLoading ? <LoadingOutlined /> : null}
        </LoadingWrapper>
      </AppLayout>
    </>
  );
};
export const getCookie = (cookie, cookie_name) => {
  const val = cookie.split(';');
  for (let i = 0; i < val.length; i++) {
    let x = val[i].substr(0, val[i].indexOf('='));
    const y = val[i].substr(val[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, '');
    if (x === cookie_name) {
      return y;
    }
  }
};
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const Token = getCookie(context.req.headers.cookie, 'Token')
      ? getCookie(context.req.headers.cookie, 'Token')
      : '';
    const Filter = getCookie(context.req.headers.cookie, 'Filter')
      ? getCookie(context.req.headers.cookie, 'Filter')
      : '';
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
      token: Token,
    });
    context.store.dispatch({
      type: LOAD_MAIL_REQUEST,
      data: context.params.newsletter,
      page: 1,
      token: Token,
      read: Filter,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);
export default Subscription;
