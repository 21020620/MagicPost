import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeOutlined, CheckCircleOutlined, BarChartOutlined, InboxOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Outlet } from "react-router-dom";
import logo from "../../img/icon.png";
import MyHeader from '../Layout/MyHeader';
import MyFooter from './MyFooter';

// Function to create a menu item structure
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// Menu items for the TE role
const menuItems = [
  getItem(<NavLink to="/TE">Trang chủ</NavLink>, "1", <HomeOutlined />),
  getItem(<NavLink to="/TE/order">Tạo đơn hàng</NavLink>, "2", <InboxOutlined />),
  getItem(<NavLink to="/TE/confirm">Xác nhận đơn</NavLink>, "3", <CheckCircleOutlined />),
  getItem(<NavLink to="/TE/statistic">Thống kê</NavLink>, "4", <BarChartOutlined />),
];

// TransactionEmployeeLayout component
const TransactionEmployeeLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      {/* Sidebar (Sider) component */}
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
        {/* Menu component with dark theme and provided 'items' */}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
      </Sider>

      {/* Main layout */}
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        {/* Header component with user information */}
        <Header
          style={{
            padding: 0,
            margin: "-10px -10px 0px -10px",
            background: colorBgContainer,
          }}
        >
          <MyHeader username={"Transaction Employee"} userRole="TE"/>
        </Header>

        {/* Content area */}
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
            {/* Outlet for rendering nested routes */}
            <Outlet />
          </div>
        </Content>

        {/* Footer component */}
        <Footer
          style={{
            backgroundColor: "#F5F5F5",
          }}
        >
          <MyFooter />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default TransactionEmployeeLayout;
