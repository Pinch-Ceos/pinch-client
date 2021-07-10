import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GIVE_CODE_REQUEST } from '../reducers';
const redirect = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    let authcode = new URL(window.location.href).searchParams.get('code');
    console.log(window);
    dispatch({
      type: GIVE_CODE_REQUEST,
      data: authcode,
    });
  }, []);

  return <div>Loading...</div>;
};

export default redirect;
