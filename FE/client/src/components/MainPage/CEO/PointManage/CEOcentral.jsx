import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';
import { Layout, Form, theme, Button, Modal } from 'antd';
import GatheringPointTable from './CentralPointTable';
const { Header, Content, Footer, Sider } = Layout;
import MyHeader from '../../../Layout/MyHeader';
import CentralPointTable from './CentralPointTable';
import AddCentral from '../../../Layout/AddCentral';
import axiosInstance from '../../../DefaultAxios';

  
const CEOcentral = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([]);
  const [managers, setManagers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});

  const handleAddButtonClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const fetchData = async () => {
    const [cpoints, managers] = await Promise.all([
      axiosInstance.get('/api/cpoint'),
      axiosInstance.get('/api/admin/cpointm'),
    ]);
    setData(cpoints.data);
    setManagers(managers.data);
  };

  const handleAddCpoint = async () => {
    console.log(formData);
    await axiosInstance.post('/api/admin/cpoint', formData);
    setIsModalVisible(false);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16, float: "left" }} onClick={handleAddButtonClick}>
        Add
      </Button>
      <CentralPointTable data={data} managers={managers} />

      <Modal
        title="Modal Title"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button key="add" type="primary" onClick={handleAddCpoint}>
            Add
          </Button>
        ]}
      >
        <AddCentral setFormData={setFormData} data={data}/>
      </Modal>
    </div>
  );
};
export default CEOcentral;