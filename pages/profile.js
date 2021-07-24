import ProfileLayout from '../component/ProfileLayout';
import React from 'react';
import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers';
import { END } from 'redux-saga';

const profile = () => {
  return <ProfileLayout />;
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

export default profile;
