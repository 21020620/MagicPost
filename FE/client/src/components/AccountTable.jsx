// Importing necessary dependencies and components
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table } from 'antd';
import PropTypes from 'prop-types';
import axiosInstance from './DefaultAxios';
import CEOmanagerAccount from './MainPage/CEO/AccountManage/CEOmanagerAccount';

// Define the AccountTable component
const AccountTable = ({ data }) => {
  // PropTypes for data prop
  AccountTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  // State variables
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [dataSources, setDataSources] = useState([]);
  const searchInput = useRef(null);

  // Effect to update dataSources when data prop changes
  useEffect(() => {
    setDataSources(Object.values(data).map(item => ({ ...item, key: item.companyID })));
  }, [data]);

  // Function to format date in the format DD/MM/YYYY
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Function to format role for display
  const formatRole = (role) => {
    if (role === 'cpointm') return 'Trưởng điểm tập kết';
    else if (role === 'cpointw') return 'Nhân viên điểm tập kết';
    else if (role === 'tpointm') return 'Trưởng điểm giao dịch';
    return 'Nhân viên điểm tập kết';
  };

  // Function to handle delete action
  const handleDelete = async (record) => {
    try {
      // Send DELETE request to remove the record
      await axiosInstance.delete(`/api/admin/employees/${record.companyID}`);
      
      // Update dataSources by filtering out the deleted record
      setDataSources(dataSources.filter(item => item.companyID !== record.companyID));
      
      // Display success message
      alert('Record deleted successfully');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  // Function to configure search properties for a column
  const getColumnSearchProps = (dataIndex) => ({
    // Filter dropdown configuration
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Input for search */}
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        {/* Search and reset buttons */}
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    // Icon for the filter
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    // Filter logic
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    // Actions on filter dropdown open/close
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // Render function for the column
    render: (text) =>
      searchedColumn === dataIndex ? (
        // Highlight the search results
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        // Render the text without highlighting
        text
      ),
  });

  // Table columns configuration
  const columns = [
    // Column for 'ID'
    { 
      title: 'ID',
      dataIndex: 'companyID',
      key: 'companyID',
    },
    // Column for 'First Name'
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      ...getColumnSearchProps('firstName'),
    },
    // Column for 'Last Name'
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      ...getColumnSearchProps('lastName'),
    },
    // Column for 'Date of Birth'
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
      ...getColumnSearchProps('dob'),
      // Render function to format timestamp as DD/MM/YYYY
      render: (timestamp) => formatDate(timestamp),
    },
    // Column for 'Address'
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
    },
    // Column for 'Email'
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    // Column for 'Phone'
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      ...getColumnSearchProps('phoneNumber'),
    },
    // Column for 'Role'
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      ...getColumnSearchProps('role'),
      // Render function to format role for display
      render: (role) => formatRole(role),
    },
    // Column for 'Delete' action
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      // Render function for the 'Delete' column
      render: (text, record) => (
        <div key={record.id}>
          {/* Delete button with confirmation */}
          <Button danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    }
  ];

  // Render the Table component
  return <Table columns={columns} dataSource={dataSources}/>;
};

// Export the AccountTable component
export default AccountTable;
