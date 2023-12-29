import React from 'react';
import { NavLink } from 'react-router-dom';
import {HomeOutlined, AppstoreOutlined, BarChartOutlined} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Outlet } from "react-router-dom";
import logo from "../../img/icon.png"
import MyHeader from '../Layout/MyHeader';
import MyFooter from '../Layout/MyFooter';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const menuItems = [
  getItem(
    <NavLink to="/Central">Trang chủ</NavLink>, "1", <HomeOutlined />
  ),

  getItem(
    <NavLink to="/Central/account">Quản lý tài khoản</NavLink>, "4", <AppstoreOutlined />
  ),

  getItem(  
    <NavLink to="/Central/statistic">Thống kê</NavLink>, "5", <BarChartOutlined />
  ),
];
  
const CentralManagerLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical">
          <img src={logo} alt="logo" 
              style={{
                width: "60px",
                height: "60px",
                marginLeft: "50px",
              }}
          />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            margin: "-10px -10px 0px -10px",
            background: colorBgContainer,
          }}
        >
          <MyHeader username={"Central Manager"} userRole="Central"/>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer>
          <MyFooter />
        </Footer>
      </Layout>
    </Layout>
  );
};
export default CentralManagerLayout;