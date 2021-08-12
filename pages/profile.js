import ProfileLayout from '../component/ProfileLayout';
import React, { useEffect } from 'react';
import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers';
import { END } from 'redux-saga';
import { getCookie } from './subscription/[newsletter]';
import Header from '../component/TopBar';
import { useSelector } from 'react-redux';
import Router from 'next/router';

const profile = () => {
  const { me } = useSelector((state) => state);
  useEffect(() => {
    if (!(me && me.user_name)) {
      Router.push('/');
    }
  }, [me && me.user_name]);
  if (!me.user_name) {
    return '내 정보 로딩중...';
  }
  return (
    <>
      <Header />
      <ProfileLayout />
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
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default profile;
