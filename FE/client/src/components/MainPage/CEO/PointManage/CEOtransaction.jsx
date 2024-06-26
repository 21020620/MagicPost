import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';
import { Layout, Menu, theme, Button, Modal, message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import TransactionPointTable from './TransactionPointTable';
import MyHeader from '../../../Layout/MyHeader';
import axiosInstance from '../../../DefaultAxios';
import AddTransaction from "../../../Layout/AddTransaction";

  
const CEOtransaction = () => {
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
    try {
      const response = await axiosInstance.get('/api/tpoint');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddTpoint = async () => {
    try {
      await axiosInstance.post('/api/tpoint', formData);
      message.success('Add transaction point successfully!');
    } catch (error) {
      message.error(error.response.data.message);
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16, float: "left" }} onClick={handleAddButtonClick}>
        Add
      </Button>
      <TransactionPointTable data={data} />

      <Modal
        title="Add Transaction Point"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button key="add" type="primary" onClick={handleAddTpoint}>
            Add
          </Button>
        ]}
      >
        <AddTransaction setFormData={setFormData} data={data}/>
      </Modal>
    </div>
  );
};
export default CEOtransaction;