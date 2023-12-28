import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Modal } from 'antd';
import { EyeOutlined, CheckOutlined } from '@ant-design/icons';
const data = [
  {
    key: '1',
    id: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    id: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    id: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    id: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];
const App = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const handleFull = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    setConfirmModalVisible(false);
  };

  const handleConfirmButtonClick = (record) => {
    setSelectedRecord(record);
    setConfirmModalVisible(true);
  };

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
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
            close
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
      dataIndex: 'id',
      key: 'id',
      width: '20%',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      width: '20%',
      ...getColumnSearchProps('orderDate'),
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      width: '20%',
      ...getColumnSearchProps('orderStatus'),
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      width: '5%',
      render: (text, record) => (
        <Button onClick={() => handleFull(record)}>
          <EyeOutlined />
        </Button>
      ),
    },
    {
      title: 'Confirm',
      dataIndex: 'confirm',
      width: '5%',
      render: (text, record) => (
        <Button onClick={() => handleConfirmButtonClick(record)}>
          <CheckOutlined />
        </Button>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} />;

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

      <Modal
        title="Xác nhận đơn hàng"
        visible={confirmModalVisible}
        onCancel={() => setConfirmModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setConfirmModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirm}>
            Xác nhận
          </Button>,
        ]}
      >
        {/* Your confirmation content goes here */}
        {/* You can customize the content based on your requirements */}
        {selectedRecord && (
          <div>
            <p>Bạn có chắc chắn muốn xác nhận đơn hàng có ID: {selectedRecord.id}?</p>
            {/* Additional confirmation details if needed */}
          </div>
        )}
      </Modal>
    </div>
  )
};
export default App;