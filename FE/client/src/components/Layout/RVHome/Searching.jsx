import React, { useState, useEffect } from "react";
import { Input, Button, Empty, Timeline, Modal, Table, Layout } from "antd";
import axios from "axios";
import styles from "./Searching.module.css";
import { useNavigate } from "react-router-dom";
import background_image from "../../../img/BG_for_search.jpg";

const { Content } = Layout;

const DeliveryTrackingPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [isMatchFound, setIsMatchFound] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios
      .get("https://65661dcbeb8bb4b70ef2ecce.mockapi.io/api/v1/dataDeliver")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = () => {
    if (data) {
      const matchingOrders = data.filter(
        (order) => order.orderID.toLowerCase() === query.toLowerCase()
      );
      setFilteredData(matchingOrders);
      setIsMatchFound(matchingOrders.length > 0);
      setModalVisible(true);
    }
  };

  const handleNavigateToLayoutForm = () => {
    navigate("/bill");
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const renderRecipientInfo = () => {
    if (filteredData.length > 0) {
      const recipientInfo = filteredData[0].customer;

      const columns = [
        { title: "Tên người nhận", dataIndex: "name" },
        { title: "Tuổi", dataIndex: "age" },
        { title: "Số điện thoại", dataIndex: "phone" },
        { title: "Giới tính", dataIndex: "gender" },
      ];

      const dataSource = [
        {
          key: "1",
          name: recipientInfo.name,
          age: recipientInfo.age,
          phone: recipientInfo.phone,
          gender: recipientInfo.gender,
        },
      ];

      return (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          size="middle"
        />
      );
    }
    return null;
  };

  const renderSenderDetails = () => {
    if (filteredData.length > 0) {
      const senderDetails = filteredData[0].receiver;

      const columns = [
        { title: "Tên người gửi", dataIndex: "name" },
        { title: "Tuổi", dataIndex: "age" },
        { title: "Số điện thoại", dataIndex: "phone" },
        { title: "Giới tính", dataIndex: "gender" },
      ];

      const dataSource = [
        {
          key: "1",
          name: senderDetails.name,
          age: senderDetails.age,
          phone: senderDetails.phone,
          gender: senderDetails.gender,
        },
      ];

      return (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          size="middle"
        />
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
            case "Đang giao":
              // Handle 'Đang giao' status
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
        <Timeline
          style={{
            marginTop: "20px",
            borderLeft: "2px solid #1890ff",
            paddingLeft: "20px",
          }}
          mode="left"
        >
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

  return (
    <div
      className={styles["delivery-tracking-page-container"]}
      style={{
        backgroundImage: `url(${background_image})`,
        backgroundSize: "auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "80px",
            fontWeight: "bold",
            color: "white",
            marginBottom: "10px",
          }}
        >
          MaggicPost
        </h1>
        <p
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "white",
            marginBottom: "20px",
          }}
        >
          Tra cứu chỉ cần một bước!
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "120px",
        }}
      >
        <Input.Search
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập mã đơn cần tra cứu tại đây"
          onSearch={handleSearch}
          style={{ marginTop: 0, width: "500px", fontWeight: "bold" }}
          enterButton
        />
      </div>

      <Modal
        title={<span style={{ fontSize: "40px" }}>Thông tin vận đơn</span>}
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button
            key="bill"
            type="primary"
            onClick={handleNavigateToLayoutForm}
          >
            Chuyển đến Bill
          </Button>,
          <Button key="close" onClick={handleModalCancel}>
            Đóng
          </Button>,
        ]}
        width={800}
      >
        {isMatchFound ? (
          <div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {renderRecipientInfo()}
              {renderSenderDetails()}
            </div>
            {renderDeliveryStatus()}
          </div>
        ) : (
          <Empty
            style={{ marginTop: "40px" }}
            description={<span>Không có dữ liệu phù hợp.</span>}
          />
        )}
      </Modal>
    </div>
  );
};

export default DeliveryTrackingPage;
