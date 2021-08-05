import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Avatar } from 'antd';
import Router from 'next/router';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Header = () => {
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ cursor: 'pointer', marginTop: 7, marginLeft: 15 }}>
          <Image
            onClick={onClickMark}
            src={'/design/pinchmark.png'}
            width="60px"
            height="27px"
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ cursor: 'pointer' }}>
            <StyledSearchOutlined onClick={onClickSearch} />
          </div>
          <div
            style={{ marginTop: '5px', cursor: 'pointer', marginLeft: '13px' }}
          >
            <Image src={'/design/alarm.png'} width="21px" height="21px" />
          </div>
          <div
            style={{
              marginLeft: '15px',
              marginRight: '20px',
              cursor: 'pointer',
              verticalAlign: 'center',
            }}
          >
            <Avatar
              style={{
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                verticalAlign: 'center',
              }}
              onClick={onClickAvatar}
            >
              E
            </Avatar>
          </div>
        </div>
      </div>
      <StyledForm onSubmit={onSubmitForm} toggle={toggle}>
        <InputWrapper
          style={{
            height: 50,
            width: '92%',
            background: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid #C0C0C0',
            borderRadius: '10px',
            marginTop: '10px',
          }}
        >
          <SearchOutlined style={{ fontSize: '150%', color: 'gray' }} />
          <input
            value={searchValue}
            onChange={onChangeInput}
            placeholder="어떤 뉴스레터를 찾고 있나요?"
            style={{
              border: 'none',
              height: 40,
              width: '87%',
              outline: 'none',
              fontSize: '15px',
              marginLeft: '10px',
            }}
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
