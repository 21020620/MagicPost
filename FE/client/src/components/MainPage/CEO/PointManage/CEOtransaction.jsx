import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import TransactionPointTable from './TransactionPointTable';
import MyHeader from '../../../Layout/MyHeader';
import axiosInstance from '../../../DefaultAxios';

  
const CEOtransaction = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/api/tpoint');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16, float: "left" }}>
        Add
      </Button>
      <TransactionPointTable data={data} />
    </div>
  );
};
export default CEOtransaction;