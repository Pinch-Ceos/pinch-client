import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GIVE_CODE_REQUEST } from '../reducers';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import Image from 'next/image';
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
    if (giveCodeDone) {
      setCookie('Token', me.token, { path: '/' });
      setCookie('Filter', 'False', { path: '/' });
    }
    router.push(`/inbox`);
  }, [giveCodeDone]);
  return (
    <LoaderWrapper>
      <ImageWrapper>
        <img
          src={'/design/modalLoader.gif'}
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
  background-color: #2B2E32;
  @media screen and (max-width: 768px) {
    font-size: 11px;
`;

const ImageWrapper = styled.div`
  width: 27em;
  height: 27em;
`;
