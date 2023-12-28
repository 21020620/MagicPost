import {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Outlet } from "react-router-dom";
import logo from "../../img/icon.png"
import MyHeader from '../Layout/MyHeader';
import axiosInstance from '../DefaultAxios.jsx';

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
    <NavLink to="/CE">Trang chủ</NavLink>, "1", <HomeOutlined />
  ),

  getItem(
    <NavLink to="/CE/order">Tạo đơn hàng</NavLink>, "2", <HomeOutlined />
  ),

  getItem(
    <NavLink to="/CE/confirm">Xác nhận đơn</NavLink>, "3", <HomeOutlined />
  ),
];
  
const CentralEmployeeLayout = () => {
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
          <MyHeader username={"Transaction Employee"} userRole="TE"/>
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
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default CentralEmployeeLayout;