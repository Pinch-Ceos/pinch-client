import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GIVE_CODE_REQUEST } from '../reducers';
import { useRouter } from 'next/router';
const redirect = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { giveCodeDone } = useSelector((state) => state);

  useEffect(() => {
    let authcode = new URL(window.location.href).searchParams.get('code');
    console.log(window);
    dispatch({
      type: GIVE_CODE_REQUEST,
      data: authcode,
    });
  }, []);
  useEffect(() => {
    if (giveCodeDone) {
      router.push('http://localhost:3000/main');
    }
  }, [giveCodeDone]);
  return <div>Loading...</div>;
};

export default redirect;
