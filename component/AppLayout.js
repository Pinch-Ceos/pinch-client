import React, { useEffect, useState } from 'react';
import { Layout, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Router from 'next/router';
import MenuLayout from './Menu';
import styled from 'styled-components';
import Image from 'next/image';

const { Header, Content, Sider } = Layout;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const address = router.pathname.split('/')[1];
  useEffect(() => {
    if (address === 'search') {
      setSearchValue(router.query.value);
    }
  }, [router]);
  const hasHeader = () => {
    return address === 'letterview';
  };
  const onChangeInput = (e) => {
    setSearchValue(e.target.value);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log(searchValue);
    Router.push(`/search/${searchValue}`);
  };

  return (
    <>
      <Global />
      <Layout>
        {hasHeader() ? null : (
          <Row>
            <Col xs={0} sm={0} md={24}>
              <StyledHeader className="site-layout-background">
                <Image src={'/design/left.png'} width="540px" height="260px" />
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
                <Image src={'/design/right.png'} width="540px" height="260px" />
              </StyledHeader>
            </Col>
          </Row>
        )}
        <StyledLayout className="site-layout">
          <Row gutter={20} style={{ border: 'none', width: '100%' }}>
            <Col md={1}></Col>
            <Col xs={23} md={4} style={{ width: '100%' }}>
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
                <MenuLayout />
              </Sider>
            </Col>
            <Col
              xs={24}
              md={18}
              style={{
                display: 'flex',
                width: '100%',
              }}
            >
              <StyledContent>{children}</StyledContent>
            </Col>
            <Col md={1}></Col>
          </Row>
        </StyledLayout>
      </Layout>
    </>
  );
};

export default AppLayout;

const LeftImageWrapper = styled.div`
  // display: flex;
  // align-items: flex-end;
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
    box-shadow: 3px 3px 3px 3px #c0c0c0;
  }
  &:hover {
    box-shadow: 3px 3px 3px 3px #c0c0c0;
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
`;
