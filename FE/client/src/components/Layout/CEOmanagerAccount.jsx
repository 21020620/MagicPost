import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import GatheringTable from '../GatheringTable';


  
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
      "phone": "888888888",
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
  }, []);
  
  return (
    <div>
      <GatheringTable data={data} />
    </div>
  );
};
export default CEOmanagerAccount;