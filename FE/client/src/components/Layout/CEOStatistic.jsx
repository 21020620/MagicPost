import React from 'react';
import { NavLink } from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import logo from "../../img/icon.jpg"
import MyHeader from './MyHeader';

  
const CEOStatistic = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      Thống kê
    </div>
  );
};
export default CEOStatistic;