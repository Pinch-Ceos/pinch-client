import React from 'react';
import 'antd/dist/antd.css';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import Header from '../component/TopBar';
import Footer from '../component/Footer';
import { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Pinch = ({ Component }) => {
  const router = useRouter();
  const topBar = () => {
    const address = router.pathname.split('/')[1];
    if (!address || address === 'redirect' || address === 'indextest') {
      return null;
    }
    return <Header />;
  };

  const footer = () => {
    const address = router.pathname.split('/')[1];
    if (!address || address === 'redirect' || address === 'indextest') {
      return null;
    }
    return <Footer />;
  };

  return (
    <Body>
      <GlobalStyles />
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
  font-family: 'Sans Neo Regular';
  src: url('/font/SpoqaHanSansNeo-Regular.otf') format('opentype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Sans Neo Medium';
  src: url('/font/SpoqaHanSansNeo-Medium.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

body, html {
  font-family: 'Sans Neo Medium';
}
@media screen and (max-width: 768px) { html { font-size: 12px; } }

`;

const Body = styled.div`
  width: 100%;
  height: 100%;
`;
