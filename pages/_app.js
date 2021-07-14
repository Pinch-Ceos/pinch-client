import React from 'react';
import { useEffect } from 'react';
import 'antd/dist/antd.css';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import '../scss/style.scss';

const Pinch = ({ Component }) => {
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }, []);

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
