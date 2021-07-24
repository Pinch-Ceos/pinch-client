import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../../component/AppLayout';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import { LOAD_DETAIL_REQUEST, LOAD_MY_INFO_REQUEST } from '../../reducers';
import { useRouter } from 'next/router';

const NewsLetterView = () => {
  const { view } = useSelector((state) => state);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    console.log(id);
  }, []);
  return (
    <>
      <AppLayout>
        <iframe
          // name="NeBoard"
          // scrolling="No"
          // onLoad="ResizeFrame(`NeBorad`);"
          style={{
            width: '75vw',
            height: '75vh',
            wordBreak: 'break-all',
            border: 'none',
            boxShadow: 'none',
          }}
          srcDoc={`${view}`}
        ></iframe>
      </AppLayout>
    </>
  );
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
    context.store.dispatch({
      type: LOAD_DETAIL_REQUEST,
      token: Token,
      data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default NewsLetterView;
