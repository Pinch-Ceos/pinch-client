import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state);
  const router = useRouter();
  const hasHeader = () => {
    const address = router.pathname.split('/');
    return address[1] === 'letterview';
  };

  return (
    <>
      <Global />
      <Layout>
        {hasHeader() ? null : (
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              width: '100%',
              height: 200,
              backgroundColor: 'lightgrey',
            }}
          />
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
                <Menu defaultSelectedKeys={['1']} mode="inline">
                  <Menu.Item
                    key="1"
                    icon="👀"
                    style={{
                      color: 'red',
                      fontWeight: 'bold',
                      borderRadius: 10,
                    }}
                  >
                    <Link href="/inbox" style={{ color: 'red' }}>
                      <a>Inbox</a>
                    </Link>
                  </Menu.Item>
                  <SubMenu
                    key="2"
                    icon="📚 "
                    title=" 구독 중인 뉴스레터"
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      borderRadius: 10,
                      background: 'white',
                    }}
                  >
                    {me.subscriptions.map((v) => (
                      <Menu.Item
                        key={v.name}
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          background: 'white',
                          paddingTop: 10,
                          margin: 0,
                          borderRadius: 10,
                        }}
                      >
                        <Link href={`/subscription/${v.email_address}`}>
                          <a>{v.name}</a>
                        </Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                  <Menu.Item
                    key="sub1"
                    icon="📌"
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      borderRadius: 10,
                    }}
                  >
                    <Link href={`/bookmark`}>
                      <a>저장한 뉴스레터</a>
                    </Link>
                  </Menu.Item>
                </Menu>
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
  .ant-list > .ant-list-header{
    border: none;
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
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: white;
  }
  .ant-menu-item-selected a, .ant-menu-item-selected a:hover {
    color: black;
  }
  .ant-menu-item a:hover {
    color: black;
  }
  .ant-menu-submenu-title:hover {
    color: black;
  }
  .ant-menu-light .ant-menu-item:hover, .ant-menu-light .ant-menu-item-active, .ant-menu-light .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, .ant-menu-light .ant-menu-submenu-active, .ant-menu-light .ant-menu-submenu-title:hover{
    color: black;
  }
  .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {
    border: none;
  }
`;
