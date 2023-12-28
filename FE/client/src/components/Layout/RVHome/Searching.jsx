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

  useEffect(() => {
    // Gửi yêu cầu GET đến API MockAPI để lấy dữ liệu
    axios.get('https://65661dcbeb8bb4b70ef2ecce.mockapi.io/api/v1/dataDeliver')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = () => {
    if (data) {
      const matchingOrders = data.filter(order => order.orderID.toLowerCase() === query.toLowerCase());
      setFilteredData(matchingOrders);
      setIsMatchFound(matchingOrders.length > 0);
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
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          className={styles.customer-info-form}
        >
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
  
        // Kiểm tra trạng thái trước đó để hiển thị nội dung phù hợp
        if (index > 0) {
          const previousStatus = statusHistory[index - 1].status;
  
          switch (item.status) {
            case 'Đang giao':
              description = previousStatus === 'Đã lấy hàng' ?
                (item.locations && item.locations.length > 0 ? `Đã đến ${item.locations.join(', ')} vào lúc ${item.timestamp}` : `Thời gian: ${item.timestamp}`) :
                'Đang giao';
              break;
            // Thêm các trạng thái khác nếu cần
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
          {timelineItems.map(item => (
            <Timeline.Item key={item.title} label={item.title}>
              {item.description}
            </Timeline.Item>
          ))}
        </Timeline>
      );
    }
    return null;
  };
  

  return (
    <div className="delivery-tracking-page-container">
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
        
        {/* Add the button to navigate to LayoutForm */}
        {isMatchFound && (
          <Button type={styles.primary} onClick={handleNavigateToLayoutForm} style={{ marginLeft: '10px' }}>
            Chuyển đến LayoutForm
          </Button>
        )}
      </Card>

      {data ? (
        !isMatchFound ? (
          <Empty style={{ marginTop: '20px' }} description={<span>Không có dữ liệu phù hợp.</span>} />
        ) : (
          <>
            {renderCustomerInfo()}
            {renderDeliveryStatus()}
          </>
        )
      ) : null}
    </div>
  );
};

export default DeliveryTrackingPage;

