import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

// StatisticTable component definition
const StatisticTable = ({ data }) => {
  // State to manage the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  // State to store the selected record when the "Detail" button is clicked
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Function to handle displaying the full details modal
  const handleFull = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  // Function to handle closing the modal
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const statusText = {
    'DONE': 'GIAO THÀNH CÔNG',
    'TRANSPORTING1': 'ĐANG TỚI ĐIỂM TẬP KẾT ĐẦU',
    'TRANSPORTING2': 'ĐANG TỚI ĐIỂM TẬP KẾT ĐÍCH',
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
      // Detail column with "Eye" icon button
      title: 'Detail',
      dataIndex: 'detail',
      render: (text, record) => (
        <Button onClick={() => handleFull(record)}>
          <EyeOutlined />
        </Button>
      ),
    },
  ];

  // Transform data for Table dataSource
  const dataSource = data.map(item => ({ ...item, key: item.id }));

  // Return the component JSX
  return (
    <div>
      {/* Ant Design Table component */}
      <Table dataSource={dataSource} columns={columns} />

      {/* Ant Design Modal component for displaying detailed information */}
      <Modal
        title="Chi tiết"
        visible={modalVisible} // Corrected the prop name
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Đóng
          </Button>,
        ]}
      >
        {/* Display detailed information for the selected record */}
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

// Export the StatisticTable component
export default StatisticTable;
