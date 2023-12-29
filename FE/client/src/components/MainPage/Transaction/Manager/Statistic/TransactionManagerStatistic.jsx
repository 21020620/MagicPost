import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import MyHeader from '../../../../Layout/MyHeader';
import axios from 'axios';
import StatisticTable from '../../../../StatisticTable';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../../DefaultAxios';

  
const TransactionManagerStatistic = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([]);
  const { workplace } = useSelector((state) => state.user);

  const fetchData = async () => {
    try {
      console.log('Fetching data from API');
      const response = await axiosInstance.get(`api/orders/tpointStats/${workplace.id}`);
      setData(response.data);
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
      <StatisticTable data={data}/>
    </div>
  );
};
export default TransactionManagerStatistic;