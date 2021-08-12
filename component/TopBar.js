import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { LOADING } from '../reducers';

const Header = () => {
  const { me } = useSelector((state) => state);
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const address = router.pathname.split('/')[1];
  const dispatch = useDispatch();
  useEffect(() => {
    if (address === 'search') {
      setSearchValue(router.query.value);
    }
  }, [router]);
  const onChangeInput = (e) => {
    setSearchValue(e.target.value);
  };
  const onClickMark = () => {
    dispatch({ type: LOADING });
    Router.push(`/inbox`);
  };
  const onClickAvatar = () => {
    dispatch({ type: LOADING });
    Router.push(`/profile`);
  };
  const onClickSearch = () => {
    setToggle(!toggle);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    Router.push(`/search/${searchValue}`);
  };
  return (
    <Container>
      <Bar>
        <Logo onClick={onClickMark}>
          <img src={'/design/pinchmark.png'} alt="logo" />
        </Logo>
        <RightBox>
          <Search>
            <StyledSearchOutlined onClick={onClickSearch} />
          </Search>
          <StyledProfile onClick={onClickAvatar}>
            <StyledImg src={`${me.profile_picture}`} alt="profileImage" />
          </StyledProfile>
        </RightBox>
      </Bar>
      <StyledForm onSubmit={onSubmitForm} toggle={toggle}>
        <InputWrapper>
          <SearchIcon />
          <StyledInput
            value={searchValue}
            onChange={onChangeInput}
            placeholder="어떤 뉴스레터를 찾고 있나요?"
          />
        </InputWrapper>
      </StyledForm>
    </Container>
  );
};
export default Header;

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background-color: white;
`;

const StyledSearchOutlined = styled(SearchOutlined)`
  @media screen and (min-width: 768px) {
    display: none;
  }
  @media screen and (max-width: 768px) {
    display: flex;
  }
  font-size: 150%;
  margintop: 2px;
`;
const StyledForm = styled.form`
  display: ${(props) => (props.toggle ? 'flex' : 'none')};
  @media screen and (min-width: 768px) {
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
  margin-left: 25px;
`;

const Search = styled.div`
  cursor: pointer;
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
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
    box-shadow: 2px 2px 2px 2px #e5e7e9;
  }
  &:focus-within {
    box-shadow: 2px 2px 2px 2px #e5e7e9;
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
  margin-right: 25px;
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

const StyledImg = styled.img`
  width: 30px;
  height: 30px;
`;

const SearchIcon = styled(SearchOutlined)`
  font-size: 150%;
  color: gray;
`;
