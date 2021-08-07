import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Avatar } from 'antd';
import Router from 'next/router';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const Header = () => {
  const { me } = useSelector((state) => state);
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const address = router.pathname.split('/')[1];
  useEffect(() => {
    if (address === 'search') {
      setSearchValue(router.query.value);
    }
  }, [router]);
  const onChangeInput = (e) => {
    setSearchValue(e.target.value);
  };
  const onClickMark = () => {
    Router.push(`/inbox`);
  };
  const onClickAvatar = () => {
    Router.push(`/profile`);
  };
  const onClickSearch = () => {
    setToggle(!toggle);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log(searchValue);
    Router.push(`/search/${searchValue}`);
  };
  return (
    <>
      <Bar>
        <Logo onClick={onClickMark}>
          <img src={'/design/pinchmark.png'} alt="logo" />
        </Logo>
        <RightBox>
          <Search>
            <StyledSearchOutlined onClick={onClickSearch} />
          </Search>
          <StyledAlarm>
            <img src={'/design/alarm.png'} alt="alarm" />
          </StyledAlarm>
          <StyledProfile onClick={onClickAvatar}>
            <img
              src={`${me.profile_picture}`}
              alt="profileImage"
              style={{ width: 30, height: 30 }}
            />
          </StyledProfile>
        </RightBox>
      </Bar>
      <StyledForm onSubmit={onSubmitForm} toggle={toggle}>
        <InputWrapper>
          <SearchOutlined style={{ fontSize: '150%', color: 'gray' }} />
          <StyledInput
            value={searchValue}
            onChange={onChangeInput}
            placeholder="어떤 뉴스레터를 찾고 있나요?"
          />
        </InputWrapper>
      </StyledForm>
    </>
  );
};
export default Header;

const StyledSearchOutlined = styled(SearchOutlined)`
  @media screen and (min-width: 576px) {
    display: none;
  }
  @media screen and (max-width: 576px) {
    display: flex;
  }
  font-size: 150%;
  margintop: 2px;
`;
const StyledForm = styled.form`
  display: ${(props) => (props.toggle ? 'flex' : 'none')};
  @media screen and (min-width: 576px) {
    display: none;
  }
  align-item: center;
  justify-content: center;
`;

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
`;

const Logo = styled.div`
  cursor: pointer;
  margin-top: 7px;
  margin-left: 15px;
`;

const Search = styled.div`
  cursor: pointer;
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAlarm = styled.div`
  /* margin-top: 5px; */
  cursor: pointer;
  margin-left: 13px;
  width: 21px;
  height: 21px;
`;

const InputWrapper = styled.div`
  height: 50;
  width: 92%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #c0c0c0;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
  &: hover {
    box-shadow: 2px 2px 2px 2px #e0e0e0;
  }
  &:focus-within {
    box-shadow: 2px 2px 2px 2px #e0e0e0;
  }
`;

const StyledInput = styled.input`
  border: none;
  height: 40px;
  width: 87%;
  outline: none;
  font-size: 15px;
  margin-left: 10px;
`;

const StyledProfile = styled.div`
  margin-left: 15px;
  margin-right: 20px;
  cursor: pointer;
  vertical-align: center;
  width: 30px;
  height: 30px;
  display: flex;
  border-radius: 100px;
  overflow-x: hidden;
  overflow-y: hidden;
  align-items: center;
  justify-content: center;
  vertical-align: center;
`;
