import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import logo from "../../img/icon.jpg"
import MyHeader from './MyHeader';
import axios from 'axios';

  
const CEOStatistic = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [message, setMessage] = useState("defuakt");

  const fetchData = async () => {
    try {
      console.log('Fetching data from API...');
      const response = await axios.get('/api/v1/ceo/TestingHomePage', { cache: false });
      setMessage(response.data);
    } catch (error) {        
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    console.log('useEffect triggered.');
    fetchData();
  }, []);

  return (
    <div>
      Thống kê
      <p>{message}</p>
    </div>
  );
};
export default CEOStatistic;