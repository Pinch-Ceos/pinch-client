import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GIVE_CODE_REQUEST } from '../reducers';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
const redirect = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { giveCodeDone, token } = useSelector((state) => state);
  const [cookie, setCookie, removeCookie] = useCookies(['Token']);

  useEffect(() => {
    let authcode = new URL(window.location.href).searchParams.get('code');
    dispatch({
      type: GIVE_CODE_REQUEST,
      data: authcode,
    });
  }, []);
  useEffect(() => {
    if (giveCodeDone) {
      setCookie('Token', token, { path: '/' });
      router.push(`http://localhost:3000/subscription/inbox`);
    }
  }, [giveCodeDone]);
  return <div>Loading...</div>;
};

export default redirect;
