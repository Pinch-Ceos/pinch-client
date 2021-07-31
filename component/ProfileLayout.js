import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { DELETE_SUBSCRIPTION_REQUEST, LOAD_SENDER_REQUEST } from '../reducers';
import { Cookies, useCookies } from 'react-cookie';

const MyProfileContent = ({ name, email_address }) => {
  return (
    <MyProfile>
      <ProfileImg>
        <Image src={'/design/profileImg.png'} width="149" height="149" />
      </ProfileImg>
      <ProfileContent>
        <ProfileName>{name}</ProfileName>
        <ProfileEmail>{email_address}</ProfileEmail>
      </ProfileContent>
    </MyProfile>
  );
};

const MyNewsLetterContent = ({ bookmark_num, subscription_num }) => {
  return (
    <NewsLetterContainer>
      {/* <ProfileIllust
        src={process.env.PUBLIC_URL + '/design/ProfileIllust.png'}
        alt="Profile Bird"
      /> */}
      <NewsLetterRead>🚀 지금까지 999+개의 뉴스레터를 읽었어요!</NewsLetterRead>
      <NewsLetterInfoContainer>
        <NewsLetter>
          <Label>저장한 뉴스레터</Label>
          <NewsLetterCount>{bookmark_num}</NewsLetterCount>
        </NewsLetter>
        <NewsLetter>
          <Label>구독 중인 뉴스레터</Label>
          <NewsLetterCount>{subscription_num}</NewsLetterCount>
        </NewsLetter>
      </NewsLetterInfoContainer>
    </NewsLetterContainer>
  );
};

const MyAccountContent = ({ email_address }) => {
  return (
    <AccountContainer>
      <AccountTitle>계정설정</AccountTitle>
      <EmailContent>
        <EmailLabel>이메일</EmailLabel>
        <EmailBox>
          <GoogleImg>
            <Image
              src={'/design/GoogleLogin_Profile.png'}
              width="44"
              height="44"
            />
          </GoogleImg>
          <MyEmail>{email_address}</MyEmail>
        </EmailBox>
      </EmailContent>
    </AccountContainer>
  );
};

const MySubscribeButton = ({ id }) => {
  const [text, setText] = useState('숨기기');
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(['Token']);
  const dispatch = useDispatch();

  const deleteSubscribe = (id) => () => {
    dispatch({
      type: DELETE_SUBSCRIPTION_REQUEST,
      data: id,
      token: cookie.Token,
    });
    console.log(id);
  };

  const changeText = () => {
    setIsMouseOver(true);
    setText('정말 그만 보시게요? 😢');
  };
  const changeText2 = () => {
    setIsMouseOver(false);
    setText('숨기기');
  };

  return (
    <DeleteButton
      type="button"
      onMouseOver={changeText}
      onMouseLeave={changeText2}
      onClick={deleteSubscribe(id)}
      isMouseOver={isMouseOver}
    >
      {text}
    </DeleteButton>
  );
};

const MySubscribeList = ({ subscriptions }) => {
  const [isHover, setIsHover] = useState(false);
  const isHoverNow = () => {
    setIsHover(true);
  };
  const notHoverNow = () => {
    setIsHover(false);
  };
  return (
    <>
      <SubscriptionTitle>
        뉴스레터 관리
        <span tooltop-text="뉴스레터 추가하기<br/>메일함 속 새로운 뉴스레터를 추가해보세요!">
          <PlusButton onMouseOver={isHoverNow} onMouseLeave={notHoverNow}>
            <Image src={'/design/ProfilePlus.png'} width="24" height="24" />
            <ToolTip isHover={isHover}>
              <ToolTipContainer isHover={isHover}>
                <ToolTipTitle isHover={isHover}>뉴스레터 추가하기</ToolTipTitle>
                <ToolTipSub isHover={isHover}>
                  메일함 속 새로운 뉴스레터를 추가해보세요!
                </ToolTipSub>
              </ToolTipContainer>
            </ToolTip>
          </PlusButton>
        </span>
      </SubscriptionTitle>
      {subscriptions.map((item) => {
        return (
          <SubscriptionList key={item.id}>
            <Subscribe>
              <SubscribeNewsName>{item.name}</SubscribeNewsName>
              <SubscribeNewsEmail>{item.email_address}</SubscribeNewsEmail>
            </Subscribe>
            <MySubscribeButton id={item.id} />
          </SubscriptionList>
        );
      })}
    </>
  );
};

const ProfileLayout = () => {
  const { me } = useSelector((state) => state);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Logo>Pinch</Logo>
        <Body>
          <MyProfileContent
            name={me.user_name}
            email_address={me.user_email_address}
          />
          <MyNewsLetterContent
            bookmark_num={me.bookmark_num}
            subscription_num={me.subscription_num}
          />
          <MyAccountContent email_address={me.user_email_address} />
          <MySubscribeList subscriptions={me.subscriptions} />
        </Body>
      </Container>
    </>
  );
};

export default ProfileLayout;

const GlobalStyle = createGlobalStyle`
  @font-face {
  font-family: 'Spoqa Han Sans Neo';
  src: url('font/SpoqaHanSansNeo-Bold.otf') format('opentype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Spoqa Han Sans Neo';
  src: url('font/SpoqaHanSansNeo-Medium.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}
* {
    font-family: 'Spoqa Han Sans Neo';
    /* overflow-x: hidden; */
    /* ::-webkit-scrollbar{
      display:none;
    } */
}

[tooltip-text]:hover{
    position:relative;
}
[tooltip-text]:hover:after{
    position:absolute;
    top:100%;
    right: 0;
    z-index: 999;
    background-color: grey;
}
`;

const Container = styled.div`
  margin-left: 1.04%;
  margin-right: 1.04%; //픽셀처리할지 퍼센트 처리할지 고민
  height: 100%;
  width: 100%;
`;

const Button = styled.div`
  background: none;
  border: none;
  border-radius: 15px;
  color: #616161;
  text-align: center;
  :focus {
    border: none;
  }
`;
const Logo = styled.div`
  margin-left: 13%;
  margin-right: 13%; //픽셀처리할지 퍼센트 처리할지 고민
  margin-top: 28px;
  margin-bottom: 10px;
  text-align: left;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin-left: 28.19%;
  margin-right: 28.19%;
`;

const MyProfile = styled.div`
  width: 100%;
  height: 9.313rem;
  margin-top: 4.5rem;
  margin-bottom: 9rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileImg = styled.div`
  /* flex-grow: 1; */
  margin-right: 2.5rem;
  padding: 0;
`;

const ProfileContent = styled.div`
  /* flex-grow: 4.5; 이부분 어떡하징...*/
`;

const ProfileName = styled.div`
  font-weight: bold;
  font-size: 1.75rem;
  line-height: 2.25rem;
  color: #171920;
`;

const ProfileEmail = styled.div`
  font-weight: normal;
  font-size: 0.875px;
  line-height: 1.25rem;
  color: #999999;
`;

const NewsLetterContainer = styled.div`
  height: 17.75rem;
  margin-bottom: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 12px;
  background-color: #f9f9f9;
`;

const NewsLetterRead = styled.div`
  height: 3.938rem;
  margin-top: 3.125rem;
  margin-bottom: 2rem;
  background: #ffffff;
  padding-top: 1.188rem;
  padding-bottom: 0.875rem;
  padding-right: 3.125rem;
  padding-left: 3.125rem;
  border-radius: 100px;
  text-align: center;
  font-weight: normal;
  font-size: 1.25rem;
  line-height: 1.875rem;
  color: #444444;
  :hover {
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
  }
`;
const ProfileIllust = styled.img`
  left: 499px;
  bottom: -190px;
  /* z-index: 999; */
  position: relative;
`;
const NewsLetterInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  /* height: 100%; */
  margin-bottom: 3.125rem;
`;
const NewsLetter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10%;
  margin-right: 10%;
`;

const Label = styled.div`
  width: auto;
  text-align: center;
  /* width: 100%; */
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.875rem;
  color: #b0b1b6;
`;
const NewsLetterCount = styled.button`
  margin-top: 0.563rem;
  width: auto;
  font-weight: bold;
  font-size: 2.5rem;
  line-height: 3.125rem;
  color: #2b2e32;
  border: none;
  background-color: #f9f9f9;
  text-align: center;
  a:active {
    border: none;
  }
`;

const AccountContainer = styled.div`
  height: 12.625rem;
  width: 100%;
  padding-bottom: 8.5rem;
`;

const AccountTitle = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2rem;
  color: #171920;
  font-weight: bold;
  text-align: left;
  width: 100%;
  padding-bottom: 0.938rem;
  border-bottom: 1px solid #dadada;
  margin-bottom: 3rem;
`;

const EmailContent = styled.div`
  height: 3.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
`;

const EmailLabel = styled.div`
  font-weight: normal;
  width: 3.125rem;
  margin-right: 0.375rem;
  font-size: 1.125rem;
  line-height: 1.625rem;
  color: #171920;
  margin-right: 34.63%;
`;

const EmailBox = styled.div`
  background: #f9f9f9;
  border-radius: 0.5rem;
  height: 3.75rem;
  width: 58.536%;
  display: flex;
`;

const GoogleImg = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.625rem;
  margin-left: 0.625rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
`;

const MyEmail = styled.div`
  margin-top: 1.125rem;
  margin-bottom: 1.125rem;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #999999;
`;

const SubscriptionTitle = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2rem;
  color: #171920;
  font-weight: bold;
  text-align: left;
  width: 100%;
  padding-bottom: 0.938rem;
  border-bottom: 1px solid #dadada;
  margin-bottom: 3rem;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const PlusButton = styled.button`
  background: none;
  /* position: relative; */
  width: 2.875rem;
  height: 2.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  :hover {
    border: none;
    position: relative;
    background-color: #f3f3f3;
    border-radius: 100px;
  }
  :hover::after {
    position: absolute;
    /* top: 105%; */
    bottom: 1000%;
    right: 0;
  }
  a:active {
    border: none;
  }
`;

const SubscriptionList = styled.div`
  margin-bottom: 4.5rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  background: #ffffff;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
  border-radius: 100px;
  width: ${(props) => (props.isMouseOver ? '28.048%' : '18.04%')};
  height: 3.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  padding: 0;
  font-size: 1.125rem;
  border: none;
  color: #616161;
  font-weight: 500;
  line-height: 1.625rem;
  :hover {
    border: none;
  }
  a:active {
    border: none;
  }
`;

const Subscribe = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubscribeNewsName = styled.div`
  font-weight: normal;
  font-size: 1.25rem;
  line-height: 1.875rem;
  color: #171920;
`;

const SubscribeNewsEmail = styled.div`
  font-weight: normal;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #999999;
`;

const ToolTip = styled.div`
  display: ${(props) => (props.isHover ? 'block' : 'none')};
  background: #ffffff;
  position: absolute;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
  border-radius: 4px;
  width: 17.5rem;
  height: 5.25rem;
`;

const ToolTipContainer = styled.div`
  display: ${(props) => (props.isHover ? 'flex' : 'none')};
  /* position: absolute; */
  width: 89.28%;
  height: 5.25rem;
  :hover {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const ToolTipTitle = styled.div`
  display: ${(props) => (props.isHover ? 'block' : 'none')};
  /* position: absolute; */
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #171920;
`;
const ToolTipSub = styled.div`
  display: ${(props) => (props.isHover ? 'block' : 'none')};
  /* position: absolute; */
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1rem;
  color: #a2a2a2;
`;
