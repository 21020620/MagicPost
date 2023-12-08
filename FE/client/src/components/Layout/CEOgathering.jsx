import React from 'react';
import { NavLink } from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import logo from "../../img/icon.jpg"
import MyHeader from './MyHeader';

  
const CEOgatheringLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      Quản lý điểm tập kết
    </div>
  );
};
export default CEOgatheringLayout;