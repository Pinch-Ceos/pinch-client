import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers';
import { useRouter } from 'next/router';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const responseGoogle = (response) => {
    console.log(response.code);
    dispatch({
      type: LOG_IN_REQUEST,
      data: response.code,
    });
    router.push('/main');
  };
  return (
    <>
      <GoogleLogin
        scope="https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.metadata https://www.googleapis.com/auth/gmail.labels"
        accessType="offline"
        responseType="code"
        uxMode="redirect"
        redirectUri="http://localhost:3000/redirect"
        clientId="923172614784-gcm4sh17kvo9ck3ute88jttltkh1d4ca.apps.googleusercontent.com"
        // buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        // cookiePolicy={'single_host_origin'}
      />
      <div>로그인</div>
    </>
  );
};

export default Login;
