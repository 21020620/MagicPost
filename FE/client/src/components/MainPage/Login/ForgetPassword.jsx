import { Button, Input, Space, Typography, message } from "antd";
import { UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

export default function ForgottenPassword() {
  const [email, setEmail] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSendVerifyCode = async () => {
    
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {contextHolder}
      <Space
        direction="vertical"
        size="large"
        style={{
          position: "relative",
          paddingTop: 50,

          textAlign: 'center', borderRadius: "10px", backgroundColor: "white", width: "500px", height: "300px"
        }}
      >
        <Title>Quên mật khẩu</Title>
        <Input
          size="large"
          placeholder="Email"
          prefix={<UserOutlined />}
          name="email"
          onChange={handleChange}
          style={{ width: '75%' }}
        />
        <div>
          <Button
            size="large"
            type="primary"
            style={{ float: "right", right: '12%' }}
            onClick={handleSendVerifyCode}
          >
            Gửi mã xác thực
          </Button>
          <Button size="large" style={{ float: "left", left: '12%' }} onClick={handleLogin}>
            <ArrowLeftOutlined />
            Đăng nhập
          </Button>
        </div>
      </Space>
    </div>
  );
}
