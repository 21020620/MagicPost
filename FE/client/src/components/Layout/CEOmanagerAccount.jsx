import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import AccountTable from '../AccountTable';
import axiosInstance from '../DefaultAxios';


  
const CEOmanagerAccount = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setData([]);
    try {
      console.log('Fetching data from API...');
      const response = await axiosInstance.get('/api/v1/ceo/getAllEmployees', { cache: false });
      console.log('Response: ', response);
      setData(response.data);
    } catch (error) {        
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    console.log('useEffect triggered.');
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }
  
  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16, float: "left" }}>
        Add
      </Button>
      <AccountTable data={data} />
    </div>
  );
};
export default CEOmanagerAccount;