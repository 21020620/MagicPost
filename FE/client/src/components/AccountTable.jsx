import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table } from 'antd';
import PropTypes from 'prop-types';
import axiosInstance from './DefaultAxios';
import CEOmanagerAccount from './Layout/CEOmanagerAccount';

const AccountTable = ({ data }) => {
  AccountTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [dataSources, setDataSources] = useState([]);
  const searchInput = useRef(null);

  useEffect(() => {
    setDataSources(Object.values(data).map(item => ({ ...item, key: item.companyID })));
  }, [data]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatRole = (role) => {
    if (role === 'ROLE_GatheringWorker') return 'Nhân viên điểm giao dịch';
    return 'Nhân viên';
  }

  const handleDelete = async (record) => {
    await axiosInstance.delete(`/api/admin/employees/${record.companyID}`)
      .then((response) => {
        setDataSources(dataSources.filter(item => item.companyID !== record.companyID));
        alert(response.data);
      }
      ).catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
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
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
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
        text
      ),
  });

  const columns = [
    { 
      title: 'ID',
      dataIndex: 'companyID',
      key: 'companyID',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      ...getColumnSearchProps('firstName'),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      ...getColumnSearchProps('lastName'),
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
      ...getColumnSearchProps('dob'),
      render: (timestamp) => formatDate(timestamp),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      ...getColumnSearchProps('phoneNumber'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      ...getColumnSearchProps('role'),
      render: (role) => formatRole(role),
    },
    {
      title: 'GatheringPoint',
      dataIndex: 'cpointId',
      key: 'cpointId',
      ...getColumnSearchProps('cpointId'),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record) => (
        <div key={record.id}>
          <Button danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    }
  ];

  return <Table columns={columns} dataSource={dataSources}/>;
};
export default AccountTable;