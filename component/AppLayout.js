import React, { useEffect, useState } from 'react';
import { Layout, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Router from 'next/router';
import MenuLayout from './Menu';
import styled from 'styled-components';

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
            <Col xs={0} sm={24}>
              <Header
                className="site-layout-background"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 0,
                  width: '100%',
                  height: 260,
                  backgroundColor: 'lightgrey',
                }}
              >
                <StyledForm onSubmit={onSubmitForm}>
                  <InputWrapper>
                    <SearchOutlined
                      style={{ fontSize: '150%', color: 'gray' }}
                    />
                    <StyledInput
                      value={searchValue}
                      onChange={onChangeInput}
                      placeholder="어떤 뉴스레터를 찾고 있나요?"
                    />
                  </InputWrapper>
                </StyledForm>
              </Header>
            </Col>
          </Row>
        )}
        <Layout
          className="site-layout"
          style={{ paddingTop: 30, backgroundColor: 'white' }}
        >
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
              <Content
                style={{
                  display: 'flex',
                  margin: '0 16px',
                  width: '95%',
                  height: '100%',
                  flexDirection: 'column',
                }}
              >
                {children}
              </Content>
            </Col>
            <Col md={1}></Col>
          </Row>
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;

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
  height: 62px;
  width: 90vw;
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
  height: 58px;
  width: 80vw;
  max-width: 540px;
  outline: none;
  font-size: 15px;
  margin-left: 10px;
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
