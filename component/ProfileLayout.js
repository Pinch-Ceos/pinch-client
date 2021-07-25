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
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '28px',
            lineHeight: '36px',
          }}
        >
          {name}
        </div>
        <div
          style={{
            color: '##999999',
            fontSize: '14px',
            lineHeight: '20px',
          }}
        >
          {email_address}
        </div>
      </ProfileContent>
    </MyProfile>
  );
};

const MyNewsLetterContent = ({ bookmark_num, subscription_num }) => {
  return (
    <NewsLetterContainer>
      <NewsLetter>
        <NewsLetterTitle>저장한 뉴스레터</NewsLetterTitle>
        <NewsLetterCount>{bookmark_num}</NewsLetterCount>
      </NewsLetter>
      <NewsLetter>
        <NewsLetterTitle>구독 중인 뉴스레터</NewsLetterTitle>
        <NewsLetterCount>{subscription_num}</NewsLetterCount>
      </NewsLetter>
    </NewsLetterContainer>
  );
};

const MyAccountContent = ({ email_address }) => {
  return (
    <div style={{ width: '100%' }}>
      <AccountTitle>계정설정</AccountTitle>
      <EmailContent>
        <NewsLetterTitle
          style={{
            textAlign: 'left',
          }}
        >
          이메일
        </NewsLetterTitle>
        <Image
          src={'/design/profileGoogleIcon.png'}
          width="50px"
          height="50px"
          style={{ marginLeft: '24%' }}
        />
        <MyEmail>{email_address}</MyEmail>
      </EmailContent>
    </div>
  );
};

const MyNewsLetterList = () => {
  return (
    <div style={{ width: '100%' }}>
      <AccountTitle>뉴스레터 관리</AccountTitle>
    </div>
  );
};

const MySubscribeButton = ({ id }) => {
  const [text, setText] = useState('숨기기');
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
    setText('정말 그만 보시게요? 😢');
  };
  const changeText2 = () => {
    setText('숨기기');
  };

  return (
    <Button
      type="button"
      onMouseOver={changeText}
      onMouseLeave={changeText2}
      onClick={deleteSubscribe(id)}
    >
      {text}
    </Button>
  );
};

const MySubscribeList = ({ subscriptions }) => {
  return (
    <SubscribtionListContainer>
      {subscriptions.map((item) => {
        return (
          <p key={item.id}>
            <div>
              {item.name}
              <br />
              {item.email_address}
            </div>
            {console.log(item.id)}
            <MySubscribeButton id={item.id} />
            {/* {MySubscribeButton()} */}
          </p>
        );
      })}
    </SubscribtionListContainer>
  );
};

const ProfileLayout = () => {
  const { me } = useSelector((state) => state);

  return (
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
        <MyNewsLetterList />
        <MySubscribeList
          subscriptions={me.subscriptions}
          // subscriptions_id={me.subscriptions.id}
        />
        {/* {MyProfileContent()} */}
        {/* {MyNewsLetterContent()} */}
        {/* {MyAccountContent()} */}
        {/* {MyNewsLetterList()} */}
        {/* {MySubscribeList()} */}
      </Body>
    </Container>
  );
};

export default ProfileLayout;

const Container = styled.div`
  margin-left: 1.06%;
  margin-right: 1.06%; //픽셀처리할지 퍼센트 처리할지 고민
  height: 100%;
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
  margin-left: 28.2%;
  margin-right: 28.2%;
`;

const MyProfile = styled.div`
  width: 100%;
  height: 13.79%;
  margin-top: 6.6%;
  margin-bottom: 13.33%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileImg = styled.div`
  flex-grow: 1;
`;

const ProfileContent = styled.div`
  flex-grow: 4.5;
`;

const NewsLetterContainer = styled.div`
  margin-bottom: 13.33%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 12px;
  :hover {
    background-color: #f9f9f9;
  }
`;

const NewsLetter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10%;
  width: 100%;
  margin-right: 10%;
`;

const NewsLetterTitle = styled.div`
  color: #444444;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  width: 100%;
`;
const NewsLetterCount = styled.div`
  color: #2b2e32;
  font-size: 40px;
  line-height: 50px;
  text-align: center;
`;

const AccountTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #1a2027;
  padding-bottom: 2%;
  margin-bottom: 4.44%;
  text-align: left;
  width: 100%;
`;
const EmailContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 13.33%;
  width: 100%;
`;
const MyEmail = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #999999;
  margin-top: 0.75em;
  margin-bottom: 0.75em;
  margin-right: 24%;
  margin-left: 2%;
`;
const SubscribtionListContainer = styled.div`
  height: 300px;
  width: 100%;
  /* overflow: scroll; */
  ::-webkit-scrollbar {
    display: none;
  }
`;
