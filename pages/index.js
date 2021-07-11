import React, { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers';
import { useRouter } from 'next/router';
import { Button } from 'antd';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { logInDone, auth_uri } = useSelector((state) => state);
  const responseGoogle = () => {
    dispatch({
      type: LOG_IN_REQUEST,
    });
  };
  useEffect(() => {
    if (logInDone) {
      router.push(`${auth_uri}`);
    }
  }, [logInDone]);
  return (
    <>
      <Button onClick={responseGoogle}>로그인</Button>
      <div>로그인</div>
    </>
  );
};

export default Login;
