import React from 'react';
import 'antd/dist/antd.css';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import Header from './headertest';
import Footer from './footer';
import { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Pinch = ({ Component }) => {
  const router = useRouter();
  const topBar = () => {
    const address = router.pathname.split('/')[1];
    if (!address || address === 'redirect') {
      return null;
    }
    return <Header />;
  };

  const footer = () => {
    const address = router.pathname.split('/')[1];
    if (!address || address === 'redirect') {
      return null;
    }
    return <Footer />;
  };

  return (
    <Body>
      <Head>
        <meta charSet="utf-8" />
        <title>Pinch</title>
      </Head>
      {topBar()}
      <Component />
      {footer()}
    </Body>
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
body, html {
  font-family: 'Spoqa Han Sans Neo';
  height: 100%;
  background: #f9f9f9;
}
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  background: #f9f9f9;
`;
