import React, { useState, useEffect } from "react";
import { Input, Button, Empty, Timeline, Modal, Table, Layout } from "antd";
import axiosInstance from "../../DefaultAxios";
import axios from "axios";
import styles from "./Searching.module.css";
import { useNavigate } from "react-router-dom";
import background_image from "../../../img/BG_for_search.jpg";


const { Content } = Layout;

const DeliveryTrackingPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isMatchFound, setIsMatchFound] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(`guest/find/${query}`);
      console.log(response.data);
      setFilteredData(response.data);
      setIsMatchFound(true);
      setDataSource([response.data]);
      setModalVisible(true);
    } catch (error) {
      console.error(error);
      setIsMatchFound(false);
      setModalVisible(true);
    }
  };

  const handleNavigateToLayoutForm = () => {
    navigate("/bill");
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const renderInfo = () => {
    console.log('Received:', dataSource);
    const flattenedData = dataSource.flat()
    const columns = [
      { 
        title: "Date", 
        dataIndex: "actionDate",
        render: (text) => {
          const date = new Date(text);
          const options = { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: 'long', day: 'numeric' };
          return date.toLocaleDateString(undefined, options);
        }
      },
      { 
        title: "Time", 
        dataIndex: "actionDate",
        render: (text) => {
          const date = new Date(text);
          const options = { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', second: '2-digit' };
          return date.toLocaleTimeString(undefined, options);
        }
      },
      { 
        title: "Trạng thái", 
        dataIndex: 'type' ,
        render: (text, record) => {
          let workplace = '';
          if(record.creator && record.creator.CEmployee) {
            workplace = record.creator.CEmployee.department.name;
          } else if(record.creator && record.creator.TEmployee) {
            workplace = record.creator.TEmployee.department.name;
          }
          switch(text) {
            case 'LEAVE':
              return 'Rời khỏi điểm' + ' ' + workplace;
            case 'CREATE':
              return 'Đơn hàng được tạo' + ' tại ' + workplace;
            case 'CONFIRM':
              return 'Đơn hàng đã đến điểm nhận' + ' tại ' + workplace;
            case 'RETURN':
              return 'Đơn hàng đã hoàn trả' + ' tại ' + workplace;
          }
        } 
      },
      { title: "Nhan vien thuc hien", 
        dataIndex: "creator",
        render: (text, record) => {
          if(record.creator) {
            return record.creator.firstName + ' ' + record.creator.lastName;
          }
          return '';
        } 
    },
    ];
    console.log('Flattened data:', flattenedData);

     return (
      <Table
        columns={columns}
        dataSource={flattenedData}
        pagination={false}
        size="middle"
      />
    );
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
        open={modalVisible}
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
              {renderInfo()}
            </div>
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
