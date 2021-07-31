import React from 'react';
import 'antd/dist/antd.css';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import { createGlobalStyle } from 'styled-components';

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

const GlobalStyles = createGlobalStyle`
  @font-face {
  font-family: 'Spoqa Han Sans Neo';
  src: url('design/font/SpoqaHanSansNeo-Bold.otf') format('opentype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Spoqa Han Sans Neo';
  src: url('design/font/SpoqaHanSansNeo-Medium.otf') format('opentype');
  font-weight: medium;
  font-style: normal;
}
body {
  /* font-family: 'Spoqa Han Sans Neo'; */
}
`;
