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

  const [data, setData] = useState([
    {
      "id": "1",
      "dtype": "GatheringEmployee",
      "dob": "2001-11-11 00:00:00.000000",
      "address": "Ha Noi, Viet Nam",
      "email": "huydung.jp@gmail.com",
      "first_name": "Dung",
      "last_name": "Nguyen",
      "phone": "1111",
      "role": "ROLE_GatheringWorker"
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
      "role": "ROLE_GatheringWorker"
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
      "role": "ROLE_GatheringWorker"
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
      "role": "ROLE_GatheringWorker"
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
      "role": "ROLE_GatheringWorker"
    }
  ]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Authorization Header:", axios.defaults.headers.common["Authorization"]);
        const response = await axios.get('/api/v1/ceo/getAllEmployees');
        console.log('Response: ', response);
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