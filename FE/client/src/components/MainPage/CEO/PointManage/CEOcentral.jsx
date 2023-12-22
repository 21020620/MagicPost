import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
import GatheringPointTable from './CentralPointTable';
const { Header, Content, Footer, Sider } = Layout;
import MyHeader from '../../../Layout/MyHeader';
import CentralPointTable from './CentralPointTable';

  
const CEOcentral = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([
    {
      "id": "1",
      "city": "Hanoi",
      "name": "Diem so 1"
    },
    {
      "id": "2",
      "city": "HCM",
      "name": "Diem so 2"
    },
    {
      "id": "3",
      "city": "Hoa Binh",
      "name": "Diem so 3"
    },
    {
      "id": "4",
      "city": "Thai Binh",
      "name": "Diem so 4"
    },
  ]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Response: ', data);
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
      <CentralPointTable data={data} />
    </div>
  );
};
export default CEOcentral;