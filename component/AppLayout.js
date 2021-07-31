import React, { useEffect, useState } from 'react';
import { Layout, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Router from 'next/router';
import MenuLayout from './Menu';

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
                  height: 200,
                  backgroundColor: 'lightgrey',
                }}
              >
                <form onSubmit={onSubmitForm}>
                  <div
                    style={{
                      height: 50,
                      width: 500,
                      background: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '2px solid #C0C0C0',
                      borderRadius: '10px',
                    }}
                  >
                    <SearchOutlined
                      style={{ fontSize: '150%', color: 'gray' }}
                    />
                    <input
                      value={searchValue}
                      onChange={onChangeInput}
                      placeholder="어떤 뉴스레터를 찾고 있나요?"
                      style={{
                        border: 'none',
                        height: 40,
                        width: 450,
                        outline: 'none',
                        fontSize: '15px',
                        marginLeft: '10px',
                      }}
                    />
                  </div>
                </form>
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
  .ant-menu .ant-menu-root .ant-menu-inline .ant-menu-light{
    background-color:white;
  }
  .ant-menu-submenu-title::active{
    background-color:white;
  }
  .ant-menu-submenu-title{
    background-color:white;
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
  .ant-menu-title-content {
    margin-left: 10px;
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
