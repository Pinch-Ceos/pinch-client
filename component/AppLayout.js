import React, { useCallback, useEffect, useState } from 'react';
import { Layout, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import Router from 'next/router';
import MenuLayout from './Menu';
import styled from 'styled-components';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { LOADING } from '../reducers';

const { Header, Content, Sider } = Layout;

const AppLayout = ({ children }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const address = router.pathname.split('/')[1];
  const dispatch = useDispatch();
  useEffect(() => {
    if (address === 'search') {
      setSearchValue(router.query.value);
    }
  }, [router]);
  const hasHeader = useCallback(() => {
    return address === 'letterview';
  }, [address]);
  const onChangeInput = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({ type: LOADING });
      Router.push(`/search/${searchValue}`);
    },
    [searchValue]
  );

  return (
    <>
      <Global />
      <Layout>
        {hasHeader() ? null : (
          <Row>
            <Col xs={0} sm={0} md={24}>
              <StyledHeader className="site-layout-background">
                <ImageWrapper>
                  <Image
                    src={'/design/left.png'}
                    width="540px"
                    height="260px"
                  />
                </ImageWrapper>
                <StyledForm onSubmit={onSubmitForm}>
                  <InputWrapper>
                    <StyledSearch />
                    <StyledInput
                      value={searchValue}
                      onChange={onChangeInput}
                      placeholder="어떤 뉴스레터를 찾고 있나요?"
                    />
                  </InputWrapper>
                </StyledForm>
                <ImageWrapper>
                  <Image
                    src={'/design/right.png'}
                    width="540px"
                    height="260px"
                  />
                </ImageWrapper>
              </StyledHeader>
            </Col>
          </Row>
        )}
        <StyledLayout className="site-layout">
          <StyledWrapper gutter={20}>
            <Col md={1}></Col>
            <MenuCol xs={23} md={4}>
              <Sider
                breakpoint
                width={{
                  xs: '480px',
                  sm: '576px',
                  md: '768px',
                  lg: '992px',
                  xl: '1200px',
                  xxl: '1600px',
                }}
                style={{ backgroundColor: 'white', border: 0 }}
              >
                <div className="logo" />
                {hasHeader() ? (
                  <MenuLayoutWrapper>
                    <MenuLayout />
                  </MenuLayoutWrapper>
                ) : (
                  <MenuLayout />
                )}
              </Sider>
            </MenuCol>
            <ChildrenCol xs={24} md={18}>
              <StyledContent>{children}</StyledContent>
            </ChildrenCol>
            <Col md={1}></Col>
          </StyledWrapper>
        </StyledLayout>
      </Layout>
    </>
  );
};

export default AppLayout;

const StyledWrapper = styled(Row)`
  border: none;
  width: 100%;
`;
const MenuCol = styled(Col)`
  width: 100%;
`;

const ChildrenCol = styled(Col)`
  display: flex;
  width: 100%;
`;

const MenuLayoutWrapper = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  align-self: flex-end;
`;

const StyledContent = styled(Content)`
  display: flex;
  margin: 0px 16px;
  width: 95%;
  height: 100%;
  flex-direction: column;
`;

const StyledLayout = styled(Layout)`
  padding-top: 30px;
  background-color: white;
`;

const StyledHeader = styled(Header)`
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  width: 100%;
  height: 260px;
  background-color: #fafafa;
`;

const StyledForm = styled.form`
  border-radius: 10px;
  &:focus-within {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.07);
  }
  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.07);
  }
`;

const InputWrapper = styled.div`
  height: 70px;
  width: 38vw;
  max-width: 620px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #c0c0c0;
  border-radius: 10px;
`;

const StyledInput = styled.input`
  border: none;
  height: 62px;
  width: 34vw;
  max-width: 540px;
  outline: none;
  font-family: 'Sans Neo Medium';
  font-size: 20px;
  margin-left: 10px;
  ::placeholder {
    color: #999999;
  }
`;

const StyledSearch = styled(SearchOutlined)`
  font-size: 150%;
  color: gray;
`;

const Global = createGlobalStyle`
  .ant-row{
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .ant-col:first-child{
    padding-left: 0 !important;
  }
  .ant-col:last-child{
    padding-right: 0 !important;
  }
  .ant-menu > .ant-menu-item-selected::after {
    border-right:none;
  }
  .ant-list-header::active{
    background-color:white;
  }
  .ant-list > .ant-list-header{
    border: none;
    background-color:white;
  }
  .ant-card-actions {
    border: none;
  }
  .body{
    margin: 0;
    width: 100%;
    height: 100%;
  }
  .ant-layout-content {
    width: 100%;
  }
  .ant-tooltip-inner {
    font-size: 13px;
    color: #A1A1A1;
  }
  .ant-card-cover img {
    border-radius: 15px;
  }
`;
