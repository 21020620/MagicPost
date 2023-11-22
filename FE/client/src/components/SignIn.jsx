import React, { useState } from 'react';
import { Button, Input, Space, Typography, message, Radio, Card } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  ToolOutlined,
  ReloadOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

export default function SignUp() {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLogin = () => {
    navigate('/');
  };

  const handleSignUp = () => {
    // Validate inputs
    if (!userData.fullName || !userData.email || !userData.phoneNumber || !userData.gender || !userData.password || !userData.confirmPassword) {
      messageApi.error('Vui lòng nhập đủ thông tin.');
      return;
    }

    // Validate full name
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!nameRegex.test(userData.fullName)) {
      messageApi.error('Họ và tên không được chứa kí tự đặc biệt.');
      return;
    }

    // Validate email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(userData.email) || !userData.email.endsWith('@gmail.com')) {
      messageApi.error('Email không đúng định dạng @gmail.com.');
      return;
    }

    // Validate phone number
    if (userData.phoneNumber.length !== 10 || isNaN(userData.phoneNumber)) {
      messageApi.error('Số điện thoại phải có đúng 10 kí tự và không chứa kí tự khác số.');
      return;
    }

    // Validate password
    if (userData.password !== userData.confirmPassword) {
      messageApi.error('Mật khẩu và nhắc lại mật khẩu không khớp.');
      return;
    }

    // Perform sign-up logic here (send data to server, etc.)

    // Display success message
    messageApi.success('Đăng ký thành công!');
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      {contextHolder}
      <Card style={{ width: 400, background: 'linear-gradient(to right, #ff69b4, #ffffff)'}}>
        <Space direction="vertical" size="large" style={{ textAlign: 'center', color: 'white' }}>
          <Title>Đăng ký nhân viên</Title>

          <Input
            size="large"
            placeholder="Họ và tên"
            prefix={<UserOutlined />}
            name="fullName"
            onChange={handleChange}
            maxLength={50}
          />

          <Input
            size="large"
            placeholder="Email"
            prefix={<MailOutlined />}
            name="email"
            onChange={handleChange}
          />

          <Input
            size="large"
            placeholder="Số điện thoại"
            prefix={<PhoneOutlined />}
            name="phoneNumber"
            onChange={handleChange}
          />

          <Radio.Group onChange={(e) => setUserData({ ...userData, gender: e.target.value })} value={userData.gender} style={{ marginBottom: '20px' }}>
            <Radio value="Nam">Nam</Radio>
            <Radio value="Nữ">Nữ</Radio>
          </Radio.Group>

          <Input.Password
            size="large"
            placeholder="Mật khẩu"
            prefix={<ToolOutlined />}
            name="password"
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            suffix={<Button icon={showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />} onClick={handleTogglePassword} />}
          />

          <Input.Password
            size="large"
            placeholder="Nhắc lại mật khẩu"
            prefix={<ReloadOutlined />}
            name="confirmPassword"
            onChange={handleChange}
            type={showConfirmPassword ? 'text' : 'password'}
            suffix={<Button icon={showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />} onClick={handleToggleConfirmPassword} />}
          />

          <Space>
            <Button size="large" type="primary" onClick={handleSignUp}>
              Đăng ký
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
}
