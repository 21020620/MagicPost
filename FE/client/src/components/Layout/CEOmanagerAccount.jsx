import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import AccountTable from '../AccountTable';
import axios from 'axios';


  
const CEOmanagerAccount = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/ceo/getAllEmployees');
        console.log('Response: ', response);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  
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