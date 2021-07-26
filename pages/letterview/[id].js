import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../component/AppLayout';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import { LOAD_DETAIL_REQUEST, LOAD_MY_INFO_REQUEST } from '../../reducers';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Image from 'next/image';
import styled from 'styled-components';

const NewsLetterView = () => {
  const { view } = useSelector((state) => state);
  const router = useRouter();
  const data = router.query;
  useEffect(() => {}, []);
  return (
    <>
      <AppLayout>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{data.name}</div>
            {data.bookmark_id ? (
              <BookmarkWrapper
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginRight: 10,
                }}
              >
                <Image
                  src={'/design/bookmarked.png'}
                  width="30px"
                  height="30px"
                  onClick={(event) => {
                    event.stopPropagation();
                    onBookmarkClick(item);
                  }}
                />
              </BookmarkWrapper>
            ) : (
              <BookmarkWrapper
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginRight: 10,
                }}
              >
                <Image
                  src={'/design/bookmark.png'}
                  width="30px"
                  height="30px"
                  onClick={(event) => {
                    event.stopPropagation();
                    onBookmarkClick(item);
                  }}
                />
              </BookmarkWrapper>
            )}
          </div>
          <div>{data.subject}</div>
        </div>
        <iframe
          // name="NeBoard"
          // scrolling="No"
          // onLoad="ResizeFrame(`NeBorad`);"
          style={{
            width: '72vw',
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

const BookmarkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  max-width: none;
  &:hover {
    width: 40px;
    height: 40px;
  }
`;
