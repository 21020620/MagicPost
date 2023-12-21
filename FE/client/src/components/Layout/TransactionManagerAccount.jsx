import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import AccountTable from '../AccountTable';
import axiosInstance from '../DefaultAxios';


  
const TransactionAccountManage = () => {
  /* const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([
    {
      "id": "1",
      "dtype": "GatheringEmployee",
      "dob": "2001-11-11 00:x100:00.000000",
      "address": "Ha Noi, Viet Nam",
      "email": "huydung.jp@gmail.com",
      "first_name": "Dung",
      "last_name": "Nguyen",
      "phone": "1111",
      "role": "ROLE_GatheringWorker",
      "gp": "null"
    },
    {
      "id": "2",
      "dtype": "GatheringEmployee",
      "dob": "2001-11-11 00:00:00.000000",
      "address": "New York, USA",
      "email": "datdo@gmail.com",
      "first_name": "Dat",
      "last_name": "Do",
      "phone": "111111111",
      "role": "ROLE_GatheringWorker",
      "gp": "null"
    }
    ,
    {
      "id": "3",
      "dtype": "GatheringEmployee",
      "dob": "2001-11-11 00:00:00.000000",
      "address": "New York, USA",
      "email": "datdo@gmail.com",
      "first_name": "Dat",
      "last_name": "Do",
      "phone": "111111",
      "role": "ROLE_GatheringWorker",
      "gp": "null"
    }
    ,
    {
      "id": "4",
      "dtype": "GatheringEmployee",
      "dob": "2001-11-11 00:00:00.000000",
      "address": "New York, USA",
      "email": "datdo@gmail.com",
      "first_name": "Dat",
      "last_name": "Do",
      "phone": "11111111",
      "role": "ROLE_GatheringWorker",
      "gp": "null"
    }
    ,
    {
      "id": "5",
      "dtype": "GatheringEmployee",
      "dob": "2001-11-11 00:00:00.000000",
      "address": "New York, USA",
      "email": "datdo@gmail.com",
      "first_name": "Dat",
      "last_name": "Do",
      "phone": "1111111",
      "role": "ROLE_GatheringWorker",
      "gp": "null"
    }
  ]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await fetch('../../data/CEOdata.json');
        console.log('Response: ', data);
        // const jsonData = await response.json();
        // setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); */

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/api/admin/employees');
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
export default TransactionAccountManage;