import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Modal } from 'antd';
import { EyeOutlined, CheckOutlined } from '@ant-design/icons';

const ConfirmLayout = ({ data }) => {
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

  // Function to get search properties for a column
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  // Function to handle search
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // Function to handle reset of search
  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  // Table columns
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
      width: '1%',
      render: (text, record) => (
        <Button onClick={() => handleFull(record)}>
          <EyeOutlined />
        </Button>
      ),
    },
    {
      title: 'Confirm',
      dataIndex: 'confirm',
      width: '1%',
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

        <Modal
            title="Xác nhận đơn hàng"
            open={confirmModalVisible}
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
            {selectedRecord && (
            <div>
                <p>Bạn có chắc chắn muốn xác nhận đơn hàng có ID: {selectedRecord.id}?</p>
            </div>
            )}
        </Modal>
    </div>
  );
};

export default ConfirmLayout;

