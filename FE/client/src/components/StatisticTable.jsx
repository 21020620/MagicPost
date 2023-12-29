import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const StatisticTable = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleFull = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const statusText = {
    'DONE': 'GIAO THÀNH CÔNG',
    'TRANSPORTING1': 'ĐANG TỚI ĐIỂM TẬP KẾT ĐẦU',
    'TRANSPORTING1': 'ĐANG TỚI ĐIỂM TẬP KẾT ĐÍCH',
    'ARRIVED': 'ĐÃ TỚI ĐIỂM GIAO DỊCH ĐÍCH',
    'FAIL': 'GIAO THẤT BẠI',
    'RETRIVAL1': 'ĐANG TRỞ VỀ ĐIỂM TẬP KẾT ĐÍCH',
    'RETRIVAL2': 'ĐANG TRỞ VỀ ĐIỂM TẬP KẾT ĐẦU',
    'RETURNING': 'ĐANG TRỞ VỀ ĐIỂM GIAO DỊCH ĐẦU',
    'RETURNED': 'ĐÃ HOÀN TRẢ',
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      dataIndex: 'orderStatus',
      key: 'status',
      render: text => statusText[text] || text,
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
        open={modalVisible}
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

export default StatisticTable;
