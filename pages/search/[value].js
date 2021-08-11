import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../../component/AppLayout';
import CardList from '../../component/CardList';
import { LOAD_MY_INFO_REQUEST, LOAD_SEARCH_MAIL_REQUEST } from '../../reducers';
import wrapper from '../../store/configureStore';
import { getCookie } from '../subscription/[newsletter]';
import { LoadingWrapper } from '../inbox';
import { LoadingOutlined } from '@ant-design/icons';
import Header from '../../component/TopBar';

const Search = () => {
  const router = useRouter();
  const { value } = router.query;
  const dispatch = useDispatch();
  const { mails, hasMoreMails, loadMailLoading, num_of_email } = useSelector(
    (state) => state
  );
  const [header, setHeader] = useState('');
  const [cookie, setCookie, removeCookie] = useCookies(['Token']);
  const [page, setPage] = useState(2);

  useEffect(() => {
    setHeader(`${num_of_email}개의 뉴스레터`);
  }, [value, num_of_email]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMoreMails && !loadMailLoading) {
          dispatch({
            type: LOAD_SEARCH_MAIL_REQUEST,
            data: value,
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
  }, [value, mails.length, hasMoreMails, loadMailLoading]);

  return (
    <>
      <Header />
      <AppLayout>
        <CardList data={mails} header={header} />
        <LoadingWrapper>
          {loadMailLoading ? <LoadingOutlined /> : null}
        </LoadingWrapper>
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
      type: LOAD_SEARCH_MAIL_REQUEST,
      data: context.params.value,
      page: 1,
      token: Token,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);
export default Search;
