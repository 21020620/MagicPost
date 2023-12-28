import { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axiosInstance from '../../../DefaultAxios';

const CentralPointTable = ({ data, managers }) => {
  const [dataSource, setDataSource] = useState([]);

  const handleDelete = async (record) => {
    await axiosInstance.delete(`/api/admin/cpoint/${record.id}`);
    console.log(`Deleting data with ID: ${record.id}`);
    setDataSource(dataSource.filter(item => item.id !== record.id));
  };

  useEffect(() => {
    setDataSource(data.map(item => ({ ...item, key: item.id })));
  }, [data]);

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
      render: (text, record) => {
        const manager = managers.find(m => m.CEmployee.cpointId === record.id);
        return manager ? manager.firstName + ' ' + manager.lastName : '';
      },
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

  return <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }}/>;
};

export default CentralPointTable;
