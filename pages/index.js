import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOADING, LOG_IN_REQUEST } from '../reducers';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import { useCookies } from 'react-cookie';

const TopBar = () => {
  return (
    <Logo>
      <Image src={'/design/pinchmark.png'} width="80" height="22" />
    </Logo>
  );
};

const MainBox = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { logInDone, auth_uri } = useSelector((state) => state);
  const [cookie, setCookie, removeCookie] = useCookies(['Token']);
  const responseGoogle = () => {
    dispatch({
      type: LOG_IN_REQUEST,
    });
  };

  useEffect(() => {
    if (cookie.Token) {
      dispatch({ type: LOADING });
      router.push('/inbox');
    }
  }, []);

  useEffect(() => {
    if (logInDone) {
      router.push(`${auth_uri}`);
    }
  }, [logInDone]);

  return (
    <MainContainer>
      <Title>
        성장하는 당신을 위한
        <br />
        가장 간편한 뉴스레터 인박스
      </Title>
      <LoginButton onClick={responseGoogle}>
        <Image src={'/design/GoogleLogin.png'} width="292" height="51" />
      </LoginButton>
      <BodyImage>
        <Image src={'/design/LoginImage.png'} width="429" height="210" />
      </BodyImage>
    </MainContainer>
  );
};

const BottomBar = () => {
  return (
    <BottomText>
      로그인은 개인정보 보호 정책 및 서비스 약관에 동의하는 것을 의미하며,
      <br />
      서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.
    </BottomText>
  );
};

const Login = () => {
  return (
    <>
      <Container>
        <TopBar />
        <ExceptLogo>
          <MainBox />
          <BottomBar />
        </ExceptLogo>
      </Container>
    </>
  );
};

export default Login;

const Container = styled.section`
  height: 100%;
  width: 100%;
`;
const ExceptLogo = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  vertical-align: center;
  justify-content: center;
  align-items: center;
`;

const Title = styled.section`
  margin-top: 11vh;
  font-weight: bold;
  font-size: max(25px, 2.2vw);
  text-align: center;
  color: #111111;
  margin-bottom: 7vh;
`;

const Logo = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginButton = styled.button`
  display: flex;
  height: 8.793%;
  justify-content: center;
  background: none;
  border: none;
  align-items: center;
  margin-bottom: 12vh;
`;

const BodyImage = styled.div`
  margin-left: 0.31%;
  margin-right: 1.77%;
  display: flex;
  align-content: center;
  justify-content: center;
  height: 37.568%;
  margin-bottom: 10vh;
`;

const BottomText = styled.div`
  width: 95%;
  font-weight: normal;
  font-size: max(11px, 0.8vw);
  line-height: max(15px, 1.2vw);
  text-align: center;
  color: #777777;
`;
