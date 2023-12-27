import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';
import { Layout, Form, theme, Button, Modal } from 'antd';
import GatheringPointTable from './CentralPointTable';
const { Header, Content, Footer, Sider } = Layout;
import MyHeader from '../../../Layout/MyHeader';
import CentralPointTable from './CentralPointTable';
import AddCentral from '../../../Layout/AddCentral';

  
const CEOcentral = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([
    {
      "id": "1",
      "address": "Hanoi",
      "name": "Diem so 1"
    },
    {
      "id": "2",
      "address": "HCM",
      "name": "Diem so 2"
    },
    {
      "id": "3",
      "address": "Hoa Binh",
      "name": "Diem so 3"
    },
    {
      "id": "4",
      "address": "Thai Binh",
      "name": "Diem so 4"
    },
  ]
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddButtonClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

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
      <Button type="primary" style={{ marginBottom: 16, float: "left" }} onClick={handleAddButtonClick}>
        Add
      </Button>
      <CentralPointTable data={data} />

      <Modal
        title="Modal Title"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
        ]}
      >
        <p>kek</p>
        <AddCentral />
      </Modal>
    </div>
  );
};
export default CEOcentral;