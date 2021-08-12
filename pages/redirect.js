import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GIVE_CODE_REQUEST } from '../reducers';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
const redirect = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { giveCodeDone, me } = useSelector((state) => state);
  const [cookie, setCookie, removeCookie] = useCookies(['Token', 'Filter']);

  useEffect(() => {
    let authcode = new URL(window.location.href).searchParams.get('code');
    dispatch({
      type: GIVE_CODE_REQUEST,
      data: authcode,
    });
  }, []);
  useEffect(() => {
    let fromprofile = new URL(window.location.href).searchParams.get(
      'loadsubscription'
    );
    if (giveCodeDone) {
      setCookie('Token', me.token, { path: '/' });
      setCookie('Filter', 'False', { path: '/' });
      router.push(`/inbox`);
    }
    if (fromprofile === 'true') {
      router.push(`/inbox`);
    }
  }, [giveCodeDone]);
  return (
    <LoaderWrapper>
      <ImageWrapper>
        <img
          src={'/design/30266-documents.gif'}
          alt="loader"
          style={{ width: '27em', height: '27em' }}
        />
      </ImageWrapper>
    </LoaderWrapper>
  );
};

export default redirect;

const LoaderWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  @media screen and (max-width: 768px) {
    font-size: 11px;
`;

const ImageWrapper = styled.div`
  width: 27em;
  height: 27em;
`;
