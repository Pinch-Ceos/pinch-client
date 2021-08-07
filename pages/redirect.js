import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GIVE_CODE_REQUEST } from '../reducers';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
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
      router.push(`/inbox`);
    }
  }, [giveCodeDone]);
  return <div>Loading...</div>;
};

export default redirect;
