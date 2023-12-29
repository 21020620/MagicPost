import { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axiosInstance from '../../../DefaultAxios';

// CentralPointTable component definition
const CentralPointTable = ({ data, managers }) => {
  // State to manage the data source for the table
  const [dataSource, setDataSource] = useState([]);

  // Function to handle the deletion of a record
  const handleDelete = async (record) => {
    // Send a delete request to the API
    await axiosInstance.delete(`/api/admin/cpoint/${record.id}`);
    console.log(`Deleting data with ID: ${record.id}`);

    // Update the data source to reflect the deletion
    setDataSource(dataSource.filter(item => item.id !== record.id));
  };

  // useEffect hook to update the data source when data prop changes
  useEffect(() => {
    // Map the data and add a 'key' property for Ant Design Table
    setDataSource(data.map(item => ({ ...item, key: item.id })));
  }, [data]);

  // Table columns configuration
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'city', // Fix the key to 'address'
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
      // Render the manager's full name using data from the 'managers' prop
      render: (text, record) => {
        const manager = managers.find(m => m.CEmployee.cpointId === record.id);
        return manager ? manager.firstName + ' ' + manager.lastName : '';
      },
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      // Render a delete button for each record
      render: (text, record) => (
        <Button danger onClick={() => handleDelete(record)}>
          <DeleteOutlined />
        </Button>
      ),
    }
  ];

  // Return the Ant Design Table component
  return <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />;
};

// Export the CentralPointTable component
export default CentralPointTable;
