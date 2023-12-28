import React from "react";
import { Row, Col, Card } from "antd";
import MyCarousel from "../../../common/MyCarousel";

export default function About() {
  const cardStyle = {
    borderRadius: "10px", 
    background: "#99CCCC",
    marginBottom: "20px",
  };

  return (
    <div>
      <Card
        style={{
          border: "none",
          background: "transparent",
          marginTop: "-100px",
          marginBottom: "20px",
          textAlign: "center",
          padding: "20px",
          width: "80%",
          fontSize: "20px",
          margin: "0 auto",
        }}
      >
        <p style={{ fontSize: "50px" }}>
          <strong>Chúng tôi tin rằng</strong>
        </p>
        <p>
          <strong>
            dịch vụ này là hữu ích cho xã hội nói chung, Người bán hàng bán được
            nhiều hàng hơn, Khách hàng mua sắm thoải mái hơn, và Người giao hàng
            có thêm nhiều công việc và thu nhập xứng đáng.
          </strong>
        </p>
      </Card>

      <Row gutter={16}>
        <Col span={16}>
          <Card
            title="Giá trị cốt lõi" 
            bordered={false}
            headStyle={{
              margin: 0,
            }}
            style={cardStyle}
          >
            <strong>Bổn phận, Chia sẻ, Trách nhiệm</strong> là ba giá trị cơ bản
            của Magic Post nhằm mang đến chất lượng dịch vụ giao hàng tốt nhất
            cho khách hàng. Chúng tôi cam kết phục vụ một cách trung thực và có
            trách nhiệm đối với từng đơn hàng của khách hàng.
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Tầm nhìn"
            bordered={false}
            headStyle={{
              margin: 0,
            }}
            style={cardStyle}
          >
            Xây dựng nền tảng hậu cần, lấy công nghệ làm trung tâm, lấy trải
            nghiệm khách hàng làm mục tiêu, ứng dụng sâu rộng công nghệ và dữ
            liệu để tạo nên phương thức vận hành tiết kiệm và hiệu quả cao cho
            khách hàng.
          </Card>
        </Col>
      </Row>

      <Card
        title="Sứ mệnh"
        bordered={false}
        style={{ ...cardStyle, borderRadius: "10px" }}
      >
        Bất kỳ ai ở bất kỳ đâu, với chiếc điện thoại di động trên tay đều có thể
        tham gia kinh doanh trực tuyến; để nuôi ước mơ tự doanh, tự lập, đổi
        đời.
      </Card>
      <br />
      <MyCarousel />
    </div>
  );
}


