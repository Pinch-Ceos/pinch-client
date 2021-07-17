import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Title = styled.div`
  text-align: center;
  font-size: 2.5em;
  font-weight: bold;
  word-break: break-word;
  margin-bottom: 8vh;
`;

const Logo = styled.div`
  //임시
  margin-top: 10vh;
  text-align: center;
  font-size: 1.125em;
  font-weight: bold;
  margin-bottom: 3vh;
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  background: none;
  border: none;
  margin-bottom: 10vh;
  align-items: center;
  /* border-radius: 15px; */
`;

const BodyImage = styled.div`
  display: flex;
  justify-content: center;
  width: 351px;
  height: 304px;
`;

// const IndexLayout = () => {
//   <Container>
//     <Logo>PINCH!</Logo>
//     <Title>
//       성장하는 당신을 위한 <br /> 간편한 뉴스레터 인박스{' '}
//     </Title>
//     <LoginButton onClick={responseGoogle}>
//       <Image src={'/design/btn_google_signin.png'} width="292px" height="51x" />
//     </LoginButton>
//     <Image src={'/design/LoginImage.png'} width="304px" height="351x" />
//     <div style={{ color: 'grey', wordBreak: 'break-word' }}>
//       로그인은 개인정보 보호 정책 및 서비스 약관에 동의하는 것을 의미하며,
//       <br />
//       서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.{' '}
//     </div>
//   </Container>;
// };

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
    console.log(`${auth_uri}`);
    if (logInDone) {
      router.push(`${auth_uri}`);
    }
  }, [logInDone]);
  return (
    <Container>
      <Logo>PINCH!</Logo>
      <Title>
        성장하는 당신을 위한 <br /> 간편한 뉴스레터 인박스{' '}
      </Title>
      <LoginButton onClick={responseGoogle}>
        <Image
          src={'/design/btn_google_signin.png'}
          width="292px"
          height="51x"
        />
      </LoginButton>
      <BodyImage>
        <Image src={'/design/LoginImage.png'} width="" height="" />
      </BodyImage>
      <div
        style={{ color: 'grey', wordBreak: 'break-word', textAlign: 'center' }}
      >
        로그인은 개인정보 보호 정책 및 서비스 약관에 동의하는 것을 의미하며,
        <br />
        서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.{' '}
      </div>
    </Container>
  );
};

export default Login;
