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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Sender name, address',
      dataIndex: 'sender_name_address',
      key: 'sender_name_address',
    },
    {
      title: 'Sender phone number',
      dataIndex: 'sender_phone_number',
      key: 'sender_phone_number',
    },
    {
        title: 'Sender code',
        dataIndex: 'sender_code',
        key: 'sender_coded',
    },
    {
        title: 'Sender Zip code',
        dataIndex: 'sender_zip_code',
        key: 'sender_zip_code',
    },
    {
      title: 'Receiver name, Address',
      dataIndex: 'receiver_name_address',
      key: 'receiver_name_address'
    },
    {
      title: 'Receiver phone number',
      dataIndex: 'receiver_phone_receiver',
      key: 'receiver_phone_receiver'
    },
    {
        title: 'Receiver Zip code',
        dataIndex: 'receiver_zip_code',
        key: 'receiver_zip_code',
    },
    {
        title: 'Type of shipment',
        dataIndex: 'type_of_shipment',
        key: 'type_of_shipment',
    },
    {
      title: 'Basic freight charges',
      dataIndex: 'basic_frieght_charges',
      key: 'basic_frieght_charges',
    },
    /* {
      title: 'Surcharge',
      dataIndex: 'surcharge',
      key: 'surcharge',
    },
    {
      title: 'Transportation fee',
      dataIndex: 'transportation_fee',
      key: 'transportation_fee',
    },
    {
      title: 'Total freight charge',
      dataIndex: 'total_freight_charge',
      key: 'total_freight_charge',
    },
    {
      title: 'Other charges',
      dataIndex: 'sender_other_charges',
      key: 'sender_other_charges',
    },
    {
      title: 'Total',
      dataIndex: 'sender_total',
      key: 'sender_total',
    },
    {
      title: 'COD',
      dataIndex: 'cod',
      key: 'cod',
    },
    {
      title: 'Other charges',
      dataIndex: 'receiver_other_charges',
      key: 'receiver_other_charges',
    },
    {
      title: 'Total',
      dataIndex: 'receiver_total',
      key: 'receiver_total',
    }, */
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

export default StatisticTable;
