import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const AppLayout = ({ children }) => {
  return (
    <Layout>
      <Header
        className="site-layout-background"
        style={{ padding: 0, height: 300 }}
      />
      <Layout className="site-layout">
        <Row>
          <Col xs={24} md={4}>
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
              style={{ ackgroundColor: 'white' }}
            >
              <div className="logo" />
              <Menu
                theme="dark"
                defaultSelectedKeys={['1']}
                mode="inline"
                style={{ backgroundColor: 'white' }}
              >
                <Menu.Item
                  key="1"
                  icon={<PieChartOutlined />}
                  style={{ color: 'black' }}
                >
                  Option 1OptionOptionOptionOptionOption
                </Menu.Item>
                <Menu.Item
                  key="2"
                  icon={<DesktopOutlined />}
                  style={{ color: 'black' }}
                >
                  Option 2
                </Menu.Item>
                <Menu.Item
                  key="sub1"
                  icon={<UserOutlined />}
                  style={{ color: 'black' }}
                >
                  user
                </Menu.Item>
                <SubMenu
                  key="sub2"
                  icon={<TeamOutlined />}
                  title="Team"
                  style={{ color: 'black' }}
                >
                  <Menu.Item key="6">Team 1</Menu.Item>
                  <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item
                  key="9"
                  icon={<FileOutlined />}
                  style={{ color: 'black' }}
                >
                  Files
                </Menu.Item>
              </Menu>
            </Sider>
          </Col>
          <Col xs={24} md={20}>
            <Content style={{ margin: '0 16px' }}>{children}</Content>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
