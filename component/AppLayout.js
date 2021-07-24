import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

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
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state);
  return (
    <>
      <Global />
      <Layout>
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            width: '100%',
            height: 200,
            backgroundColor: 'lightgrey',
          }}
        />
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
                <Menu
                  defaultSelectedKeys={['1']}
                  mode="inline"
                  style={{
                    backgroundColor: 'white',
                    border: 0,
                    width: '100%',
                  }}
                >
                  <Menu.Item
                    key="1"
                    icon="👀"
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      borderRadius: 10,
                    }}
                  >
                    <Link href="/subscription/inbox">
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
                    }}
                  >
                    {me.subscriptions.map((v) => (
                      <Menu.Item
                        key={v.name}
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
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
                    <Link href={`/subscription/${bookmark}`}>
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
