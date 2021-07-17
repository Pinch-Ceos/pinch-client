import React from 'react';
import 'antd/dist/antd.css';
import Head from 'next/head';
import wrapper from '../store/configureStore';

const Pinch = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Pinch</title>
      </Head>
      <Component />
    </>
  );
};

export default wrapper.withRedux(Pinch);
