import React from 'react';
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const CentralPointTable = ({ data }) => {
  const handleDelete = (record) => {
    // Xử lý logic xóa dữ liệu 
    console.log(`Deleting data with ID: ${record.id}`);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'city',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Manager',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      render: (text, record) => (
        <Button danger onClick={() => handleDelete(record)}>
          <DeleteOutlined />
        </Button>
      ),
    }
  ];

  const dataSource = data.map(item => ({ ...item, key: item.id }));

  return <Table dataSource={dataSource} columns={columns} />;
};

export default CentralPointTable;
