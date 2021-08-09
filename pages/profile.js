import ProfileLayout from '../component/ProfileLayout';
import React from 'react';
import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers';
import { END } from 'redux-saga';
import { getCookie } from './subscription/[newsletter]';
import Header from '../component/TopBar';

const profile = () => {
  return (
    <>
      <Header />
      <ProfileLayout />;
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
