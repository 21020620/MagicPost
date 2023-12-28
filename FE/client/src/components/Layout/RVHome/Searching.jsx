import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Empty, Form, Timeline, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import styles from './Searching.module.css';
import { useNavigate } from 'react-router-dom';


const DeliveryTrackingPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [isMatchFound, setIsMatchFound] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios
      .get('https://65661dcbeb8bb4b70ef2ecce.mockapi.io/api/v1/dataDeliver')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = () => {
    if (data) {
      const matchingOrders = data.filter((order) => order.orderID.toLowerCase() === query.toLowerCase());
      setFilteredData(matchingOrders);
      setIsMatchFound(matchingOrders.length > 0);
      setModalVisible(true); // Show the modal after searching
    }
  };

  const handleNavigateToLayoutForm = () => {
    // Add any necessary logic here before navigating, if needed
    navigate('/bill');
  };

  const renderCustomerInfo = () => {
    if (filteredData.length > 0) {
      const customerInfo = filteredData[0].customer;
      return (
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} className={styles['customer-info-form']}>
          <Form.Item label="Tên khách hàng">{customerInfo.name}</Form.Item>
          <Form.Item label="Tuổi">{customerInfo.age}</Form.Item>
          <Form.Item label="Số điện thoại">{customerInfo.phone}</Form.Item>
          <Form.Item label="Giới tính">{customerInfo.gender}</Form.Item>
        </Form>
      );
    }
    return null;
  };

  const renderDeliveryStatus = () => {
    if (filteredData.length > 0) {
      const statusHistory = filteredData[0].orderDetails.statusHistory;

      const timelineItems = statusHistory.map((item, index) => {
        let description = `Thời gian: ${item.timestamp}`;

        if (index > 0) {
          const previousStatus = statusHistory[index - 1].status;

          switch (item.status) {
            case 'Đang giao':
              description =
                previousStatus === 'Đã lấy hàng'
                  ? item.locations && item.locations.length > 0
                    ? `Đã đến ${item.locations.join(', ')} vào lúc ${item.timestamp}`
                    : `Thời gian: ${item.timestamp}`
                  : 'Đang giao';
              break;
            default:
              break;
          }
        }

        return {
          title: item.status,
          description,
        };
      });

      return (
        <Timeline style={{ marginTop: '20px', borderLeft: '2px solid #1890ff', paddingLeft: '20px' }}>
          {timelineItems.map((item) => (
            <Timeline.Item key={item.title} label={item.title}>
              {item.description}
            </Timeline.Item>
          ))}
        </Timeline>
      );
    }
    return null;
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles['delivery-tracking-page-container']}>
      <Card title="Vui lòng nhập mã vận đơn">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ví dụ: DH001..."
          prefix={<SearchOutlined />}
        />
        <Button type={styles.primary} onClick={handleSearch} style={{ marginLeft: '10px' }}>
          Tìm kiếm
        </Button>
      </Card>

      <Modal
        title="Thông tin vận đơn"
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="bill" type="primary" onClick={handleNavigateToLayoutForm}>
            Chuyển đến LayoutForm
          </Button>,
          <Button key="close" onClick={handleModalCancel}>
            Đóng
          </Button>,
        ]}
        width={800} // Điều chỉnh chiều rộng tùy ý, ví dụ 800px
      >
        {/* Nội dung Modal */}
        {isMatchFound ? (
          <>
            {renderCustomerInfo()}
            {renderDeliveryStatus()}
          </>
        ) : (
          <Empty style={{ marginTop: '20px' }} description={<span>Không có dữ liệu phù hợp.</span>} />
        )}
      </Modal>
    </div>
  );
};

export default DeliveryTrackingPage;
