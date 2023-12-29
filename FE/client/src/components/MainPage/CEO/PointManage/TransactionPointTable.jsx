import { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const TransactionPointTable = ({ data }) => {
  const [dataSource, setDataSource] = useState([]);
  const handleDelete = async (record) => {
    await axiosInstance.delete(`/api/tpoint/${record.id}`);
    setDataSource(dataSource.filter((item) => item.id !== record.id));
    console.log(`Deleting data with ID: ${record.id}`);
  };

  useEffect(() => {
    setDataSource(data.map(item => ({ ...item, key: item.id })));
  }, [data]);

  console.log(data);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Central Point',
      dataIndex: ['parentCP', 'address'],
      key: 'parentCP.address',
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

  return <Table dataSource={dataSource} columns={columns} />;
};

export default TransactionPointTable;
