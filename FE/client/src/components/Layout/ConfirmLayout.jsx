import React, { useState } from 'react';
import { Button, Input, Space, Table, Modal, Form, Select } from 'antd';
import {
  EyeOutlined,
  CheckOutlined,
  StopOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';
import axiosInstance from '../DefaultAxios';

const ConfirmLayout = ({ data }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [receivingLocation, setReceivingLocation] = useState('');
  const { user, workplace } = useSelector((state) => state.user);

  const handleFull = (record) => {
    setSelectedRecord(record);
    setDetailModalVisible(true);
  };

  const handleDetailModalClose = () => {
    setDetailModalVisible(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleConfirm = async () => {
    const orderId = selectedRecord.id;
    let orderStatus = "";
    let type = "LEAVE";
    if(selectedRecord.orderStatus === "CREATE") orderStatus = "TRANSPORTING1";
    else if(selectedRecord.orderStatus === "TRANSPORTING1") orderStatus = "TRANSPORTING2";
    else if(selectedRecord.orderStatus === "TRANSPORTING2") orderStatus = "ARRIVED";
    else if(selectedRecord.orderStatus === "RETRIVAL1") orderStatus = "RETRIVAL2";
    else if(selectedRecord.orderStatus === "RETRIVAL2") orderStatus = "RETURNING";
    else if(selectedRecord.orderStatus === "ARRIVED") {
      orderStatus = "DONE";
      type = "CONFIRM";
    }
    else if(selectedRecord.orderStatus === "RETURNING") {
      orderStatus = "RETURNED";
      type = "RETURN";
    }
    const orderAction = {
      creatorID: user.companyID,
      type,
    };
    try {
      console.log({ orderId, orderAction, orderStatus })
      await axiosInstance.put(`/api/orders`, { orderId, orderAction, orderStatus });
      console.log("Update order success!");
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
      console.log(error);
    }
    setConfirmModalVisible(false);
  
    try {
      if (isSuccess) {
        // Show a success message
        Modal.success({
          title: 'Confirmation',
          content: 'Order confirmed successfully!',
        });
      } else {
        // For unsuccessful cases, show the "Chi tiết" modal with an additional confirmation button
        Modal.error({
          title: 'Confirmation',
          content: 'Order confirmation failed !',
        });
  
        // Optionally, you can open the "Chi tiết" modal for further confirmation
        setModalVisible(true);
      }
    } catch (error) {
      // Handle any unexpected errors
      Modal.error({
        title: 'Error',
        content: error.message || 'An unexpected error occurred during order confirmation!',
      });
    }
  };

  const handleDetailConfirm = async () => {
    console.log('from here');
    setModalVisible(false);
  
    try {
      let orderStatus = "";
      let type = "";
      const orderId = selectedRecord.id;
      if(selectedRecord.cannotSend === 3) {
        orderStatus = "FAIL";
        type = "CANCEL";
      } else {
        orderStatus = "RETRIVAL1";
        type = "LEAVE";
      }
      const orderAction = {
        creatorID: user.companyID,
        type,
      };
      try {
        console.log({ orderId, orderAction, orderStatus })
        await axiosInstance.put(`/api/orders`, { orderId, orderAction, orderStatus });
        console.log("Update order success!");
      } catch (error) {
        console.log(error);
      }
     
      Modal.success({
        //Xác nhận hủy đơn thành công
        title: 'Confirmation',
        content: 'Order cancelled confirmed successfully!',
      });
    } catch (error) {
      Modal.error({
        title: 'Confirmation',
        content: error.message || 'Order confirmation failed !',
      });
    }
  };

  const handleSuccessClick = (record) => {
    setSelectedRecord(record);
    setIsSuccess(true);
    setConfirmModalVisible(true);
  };

  const handleUnsuccessClick = (record) => {
    setSelectedRecord(record);
    setIsSuccess(false);
    setModalVisible(true);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const convertKeyName = (input) => {
    return input
    .replace(/([A-Z])/g, ' $1') 
    .replace(/^./, function(str){ return str.toUpperCase(); })
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '20%',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      width: '20%',
      ...getColumnSearchProps('orderDate'),
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      width: '20%',
      ...getColumnSearchProps('orderStatus'),
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      width: '1%',
      render: (text, record) => (
        <Button onClick={() => handleFull(record)}>
          <EyeOutlined />
        </Button>
      ),
    },
    {
      title: 'Confirm',
      dataIndex: 'confirm',
      width: '10%',
      render: (text, record) => (
        <div>
          <Button onClick={() => handleSuccessClick(record)}>
            <CheckOutlined />
          </Button>
          <Button onClick={() => handleUnsuccessClick(record)} style={{ marginLeft: '10px' }}>
            <StopOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />

      <Modal
        title="Thông tin của đơn"
        open={detailModalVisible}
        onCancel={handleDetailModalClose}
        footer={[
          <Button key="cancel" onClick={handleDetailModalClose}>
            Hủy
          </Button>,
        ]}
      >
        {selectedRecord && (
          <div>
            {Object.keys(selectedRecord).map((key) => (
              <p key={key}>
                <strong>{convertKeyName(key)}:</strong> {selectedRecord[key]}
              </p>
            ))}
          </div>
        )}
      </Modal>

      <Modal
        title="Xác nhận đơn hàng"
        open={confirmModalVisible}
        onCancel={() => setConfirmModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setConfirmModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirm}>
            Xác nhận
          </Button>,
        ]}
      >
        {selectedRecord && isSuccess && (
          <div>
            <p>
              Bạn có chắc chắn muốn xác nhận đơn hàng có ID: {selectedRecord.id} thành công?
            </p>
          </div>
        )}
      </Modal>

      <Modal
        title="Chi tiết"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="confirmDetail" type="primary" onClick={isSuccess ? handleModalClose : handleDetailConfirm}>
            Xác nhận
          </Button>,
          <Button key="close" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>,
        ]}
      >
        {selectedRecord && !isSuccess && (
          <div>
            <p>
              Bạn có chắc chắn muốn xác nhận đơn hàng có ID: {selectedRecord.id} không thành công?
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ConfirmLayout;
