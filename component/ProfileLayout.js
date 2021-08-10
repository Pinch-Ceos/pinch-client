import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { DELETE_SUBSCRIPTION_REQUEST, DELETE_USER_REQUEST } from '../reducers';
import { Cookies, useCookies } from 'react-cookie';
import Router from 'next/router';
import { Tooltip } from 'antd';
import Modal from '../component/Modal';
import { DEFAULT_SCROLLING_RESET_TIME_INTERVAL } from 'react-virtualized/dist/es/grid';

const MyProfileContent = ({ name, email_address, profile_picture }) => {
  return (
    <MyProfile>
      <ProfileImg>
        <img
          src={`${profile_picture}`}
          alt="profileImage"
          style={{ width: '9.313em', height: '9.313em' }}
        />
      </ProfileImg>
      <ProfileContent>
        <ProfileName>{name}</ProfileName>
        <ProfileEmail>{email_address}</ProfileEmail>
      </ProfileContent>
    </MyProfile>
  );
};

const MyNewsLetterContent = ({ bookmark_num, subscription_num }) => {
  const savedNewsLetterOnClick = () => {
    Router.push(`/bookmark`);
  };

  const subscribedNewsLetterOnClick = () => {
    Router.push(`/inbox`);
  };

  return (
    <NewsLetterContainer>
      <NewsLetterRead>🚀 지금까지 999+개의 뉴스레터를 읽었어요!</NewsLetterRead>
      <NewsLetterInfoContainer>
        <NewsLetter>
          <Label>저장한 뉴스레터</Label>
          <NewsLetterCount onClick={savedNewsLetterOnClick}>
            {bookmark_num}
          </NewsLetterCount>
        </NewsLetter>
        <NewsLetter>
          <Label>구독 중인 뉴스레터</Label>
          <NewsLetterCount onClick={subscribedNewsLetterOnClick}>
            {subscription_num}
          </NewsLetterCount>
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
            <img
              src={'/design/GoogleLogin_Profile.png'}
              alt="loginimg"
              style={{ width: '1.813em', height: '1.5em' }}
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
const text = (
  <span>
    <div>새로 구독한 뉴스레터가 있으시다면, 뉴스레터를 추가해 주세요!</div>
    <TooltipButton>추가하러 가기</TooltipButton>
  </span>
);

const MySubscribeList = ({ subscriptions }) => {
  const ModalOpen = () => {
    return <Modal />;
  };
  return (
    <>
      <SubscriptionTitle>
        <ManageTitle>뉴스레터 관리</ManageTitle>
        <div className="demo">
          <div style={{ marginLeft: 100, whiteSpace: 'nowrap' }}>
            <Tooltip placement="topRight" title={text}>
              <PlusButton onCLick={ModalOpen}>
                <img
                  src={'/design/ProfilePlus.png'}
                  alt="plus"
                  style={{ width: '1.5em', height: '1.5em' }}
                />
              </PlusButton>
            </Tooltip>
          </div>
        </div>
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

const LogOut = () => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();

  function logout(e) {
    removeCookie(cookie.Token);
    Router.push('/');
  }

  function userDelete(e) {
    // dispatch({
    //   type: DELETE_USER_REQUEST,
    //   token: cookie.Token,
    // });
    Router.push('/');
  }

  return (
    <BottomContainer>
      <LogOutContainer>
        <LogOutButton onClick={logout}>로그아웃</LogOutButton>
      </LogOutContainer>
      <LogOutContainer>
        <UserDeleteButton onClick={userDelete}>
          그냥 탈퇴할래요
        </UserDeleteButton>
      </LogOutContainer>
    </BottomContainer>
  );
};

const ProfileLayout = () => {
  const { me } = useSelector((state) => state);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Body>
          <MyProfileContent
            name={me.user_name}
            email_address={me.user_email_address}
            profile_picture={me.profile_picture}
          />
          <MyNewsLetterContent
            bookmark_num={me.bookmark_num}
            subscription_num={me.subscription_num}
          />
          <MyAccountContent email_address={me.user_email_address} />
          <MySubscribeList subscriptions={me.subscriptions} />
          <LogOut />
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

  .ant-tooltip-inner{
    /* background: #FFFFFF;
    box-shadow: 0px 1px 30px rgba(145, 145, 145, 0.2);
    border-radius: 12px;
    width:38.563em;
    height: 10.188em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center; */
  }
  .ant-tooltip-arrow{
    display: none;
  }
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
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

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 100%;
  max-width: 820px;
  justify-content: center;
`;

const MyProfile = styled.div`
  width: 100%;
  height: 9.313rem;
  margin-top: 4.5em;
  margin-bottom: 9em;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileImg = styled.div`
  border-radius: 100px;
  height: 9.313em;
  width: 9.313em;
  margin-right: 2.5rem;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

const ProfileName = styled.div`
  font-weight: bold;
  font-size: 1.75em;
  line-height: 2.25em;
  color: #171920;
`;

const ProfileEmail = styled.div`
  font-weight: normal;
  font-size: 0.875em;
  line-height: 1.25em;
  color: #999999;
`;

const NewsLetterContainer = styled.div`
  margin-bottom: 9em;
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
  padding-top: 1.125rem;
  padding-bottom: 15px;
  padding-right: 3.125rem;
  padding-left: 3.125rem;
  border-radius: 100px;
  text-align: center;
  font-weight: normal;
  font-size: 1.25em;
  line-height: 1.875em;
  color: #444444;
  :hover {
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
  }
`;

const NewsLetterInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
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
  font-weight: 500;
  font-size: 1.25em;
  line-height: 1.875em;
  color: #b0b1b6;
`;

const NewsLetterCount = styled.button`
  margin-top: 0.625em;
  width: auto;
  font-weight: bold;
  font-size: 2.5em;
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
  font-size: 1.5em;
  line-height: 2em;
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
  width: 100%;
`;

const EmailLabel = styled.div`
  font-weight: normal;
  width: 3.125rem;
  margin-right: 0.375rem;
  font-size: 1.125em;
  line-height: 1.625em;
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
  height: 2.75em;
  width: 2.75em;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.625rem;
  margin-left: 0.625rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyEmail = styled.div`
  margin-left: 0.75em;
  margin-top: 1.125rem;
  margin-bottom: 1.125rem;
  font-weight: 500;
  font-size: 1em;
  line-height: 1.5em;
  color: #999999;
`;

const SubscriptionTitle = styled.div`
  width: 100%;
  padding-bottom: 0.938rem;
  border-bottom: 1px solid #dadada;
  margin-bottom: 3rem;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const PlusButton = styled(Button)`
  background: none;
  /* width: 2.875em; */
  /* height: 2.875em; */
  width: 1.5em;
  height: 1.5em;
  padding: 1.375em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: #f3f3f3;
  border: none;
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
  font-size: 1.125em;
  border: none;
  color: #616161;
  font-weight: 500;
  line-height: 1.625em;
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
  font-size: 1.25em;
  line-height: 1.875em;
  color: #171920;
`;

const SubscribeNewsEmail = styled.div`
  font-weight: normal;
  font-size: 0.875em;
  line-height: 1.25em;
  color: #999999;
`;

const LogOutContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
`;

const LogOutButton = styled.button`
  background: #f9f9f9;
  border-radius: 100px;
  width: 11.25em;
  height: 3.5em;
  font-weight: 500;
  font-size: 1em;
  line-height: 1.5em;
  text-align: center;
  color: #aeaeae;
  border: none;
`;

const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 3.111rem;
  padding-top: 9rem;
  flex-direction: column;
`;
const ManageTitle = styled.div`
  font-weight: bold;
  font-size: 1.5em;
  line-height: 2em;
  color: #171920;
  text-align: left;
`;

const UserDeleteButton = styled.button`
  font-weight: normal;
  font-size: 0.667em;
  line-height: 1em;
  width: 12em;
  height: 3.5em;
  display: flex;
  align-items: center;
  text-align: center;
  color: #cdcccc;
  background-color: white;
  border: none;
  :focus {
    outline: none;
  }
  :hover {
    text-decoration: underline;
  }
`;

const ProfileContent = styled.div``;

const TooltipText = styled.div`
  font-weight: normal;
  font-size: 1.25em;
  line-height: 1.5em;
  color: #b0b1b6;
`;

const TooltipButton = styled.button`
  font-weight: normal;
  font-size: 1.25em;
  line-height: 1.5em;
  width: 8.15em;
  height: 2.25em;
  background: #3562ff;
  color: #ffffff;
  text-align: center;
  margin-left: 3.1em;
`;
