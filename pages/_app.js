import React, { useCallback } from 'react';
import 'antd/dist/antd.css';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import Footer from '../component/Footer';
import { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Pinch = ({ Component }) => {
  const router = useRouter();
  const { loading } = useSelector((state) => state);

  const footer = useCallback(() => {
    const address = router.pathname.split('/')[1];
    if (!address || address === 'redirect') {
      return null;
    }
    return <Footer />;
  }, [router]);

  return (
    <Body>
      <GlobalStyles />
      <Head>
        <meta charSet="utf-8" />
        <title>Pinch</title>
      </Head>
      <Component />
      {footer()}
      {loading && (
        <LoaderWrapper>
          <Loader src={'/design/Loader_transparent.gif'} alt="loading..." />
        </LoaderWrapper>
      )}
    </Body>
  );
};

export default wrapper.withRedux(Pinch);

const Loader = styled.img`
  width: 50%;
  height: 50%;
  @media screen and (max-width: 768px) {
    width: 25%;
    height: 25%;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 999;
  @media screen and (max-width: 768px) {
    right: 20px;
    bottom: 20px;
  }
`;

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

@font-face {
  font-family: 'Poppins-Bold';
  src: url('/font/Poppins-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Poppins-Medium';
  src: url('/font/Poppins-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Poppins-Regular';
  src: url('/font/Poppins-Regular.ttf') format('truetype');
  font-weight: 400;
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
