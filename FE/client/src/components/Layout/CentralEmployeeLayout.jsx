// Import necessary dependencies and components from React, React Router, Ant Design, and other sources
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { HomeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import logo from '../../img/icon.png';
import MyHeader from '../Layout/MyHeader';
import MyFooter from './MyFooter';
import axiosInstance from '../DefaultAxios.jsx';

// Destructure components from Ant Design Layout
const { Header, Content, Footer, Sider } = Layout;

// Helper function to create menu items
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// Define menu items for the sidebar
const menuItems = [
  getItem(
    <NavLink to="/CE">Trang chủ</NavLink>,
    '1',
    <HomeOutlined />
  ),
  getItem(
    <NavLink to="/CE/confirm">Xác nhận đơn</NavLink>,
    '3',
    <CheckCircleOutlined />
  ),
];

// Define the CentralEmployeeLayout component
const CentralEmployeeLayout = () => {
  // Extract colorBgContainer from the theme
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      {/* Sidebar */}
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
        {/* Logo */}
        <div className="demo-logo-vertical">
          <img
            src={logo}
            alt="logo"
            style={{
              width: '60px',
              height: '60px',
              marginLeft: '50px',
            }}
          />
        </div>
        {/* Sidebar Menu */}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
      </Sider>

      {/* Main Content */}
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        {/* Header */}
        <Header
          style={{
            padding: 0,
            margin: '-10px -10px 0px -10px',
            background: colorBgContainer,
          }}
        >
          {/* Custom header component */}
          <MyHeader username={'Central Employee'} userRole="CE" />
        </Header>

        {/* Content Area */}
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          {/* Outlet for rendering nested routes */}
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

        {/* Footer */}
        <Footer
          style={{
            backgroundColor: '#F5F5F5',
          }}
        >
          {/* Custom footer component */}
          <MyFooter />
        </Footer>
      </Layout>
    </Layout>
  );
};

// Export the CentralEmployeeLayout component
export default CentralEmployeeLayout;
