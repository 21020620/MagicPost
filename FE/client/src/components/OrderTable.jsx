import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const OrderTable = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleFull = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
        title: 'Order Date',
        dataIndex: 'orderDate',
        key: 'orderDate',
    },
    {
        title: 'Status',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
    },
    {
        title: 'cannotSend',
        dataIndex: 'cannotSend',
        key: 'cannotSend',
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      render: (text, record) => (
        <Button onClick={() => handleFull(record)}>
          <EyeOutlined />
        </Button>
      ),
    },
  ];

  const dataSource = data.map(item => ({ ...item, key: item.id }));

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Chi tiết"
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Đóng
          </Button>,
        ]}
      >
        {selectedRecord && (
          <div>
            {Object.keys(selectedRecord).map(key => (
              <p key={key}>
                <strong>{key}:</strong> {selectedRecord[key]}
              </p>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderTable;
