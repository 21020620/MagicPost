import { Col, Row } from "antd";
import React from "react";

import img1 from "../img/img1.png";
import img2 from "../img/img2.png";
import img3 from "../img/img3.png";
import img4 from "../img/img4.png";
import img5 from "../img/img5.png";

const containerStyle = {
  background: "#f0f0f0",
  padding: 20,
  display: "flex",
  justifyContent: "center",
};

const colStyle = {
  textAlign: "center",
  marginBottom: 10,
  background: "#f0f0f0",
  flex: "1 0 25%",
  width: 200,
};



const circleStyle = {
  width: 100,
  height: 100,
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #fff", 
  margin: "auto",
};


const imgStyle = { width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }; // Kích thước cố định cho ảnh và căn giữa ảnh

const textContainerStyle = {
  whiteSpace: "normal", 
  wordWrap: "break-word", 
};

const texts = [
  "Trung tâm hệ thống MagicPost tiếp nhận đơn hàng",
  "Nhân viên vận chuyển của MagicPost qua địa chỉ điểm tập kết để lấy hàng",
  "Nhân viên vận chuyển giao hàng cho khách và thu tiền (nếu có)",
  "Nhân viên đối soát đối với đơn hàng qua tài khoản ngân hàng. Đồng thời gửi biên soạn tới hệ thống quản lý MagicPost",
  "Kết thúc giao hàng",
];

export default function MyGridComponent() {
  const images = [img1, img2, img3, img4, img5];

  return (
    <div style={containerStyle}>
      <Row gutter={[10, 10]} justify="center">
        {images.map((img, index) => (
          <Col key={index} sm={12} md={8} xl={4} style={colStyle}>
            <div style={circleStyle}>
              <img src={img} alt={`img${index + 1}`} style={imgStyle} />
            </div>
            <div style={{ ...textContainerStyle, margin: "5px 0" }}>
              <p style={{ margin: 0 }}>{texts[index]}</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
