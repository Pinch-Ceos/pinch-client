import React from 'react';
import 'antd/dist/antd.css';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import Header from './headertest';

const Pinch = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Pinch</title>
      </Head>
      <Header />
      <Component />
    </>
  );
};

export default wrapper.withRedux(Pinch);
