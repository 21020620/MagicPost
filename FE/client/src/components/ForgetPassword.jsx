import React, { useState } from 'react';
import { Button, Input, Space, Typography, message } from 'antd';
import {
  UserOutlined,
  ArrowLeftOutlined,
  ToolOutlined,
  ReloadOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { fetchAPIPostForgetPassword } from '../api/index';
const { Title } = Typography;

export default function ForgottenPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
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

  const handleConfirm = async () => {
    // Perform password update logic here
    // You can use newPassword and confirmPassword values
    // to send a request to update the password

    try {
      // Assuming a successful password update
      // Perform the password update logic here
      messageApi.success('Đổi mật khẩu thành công!');
      // Navigate back to the login page
      navigate('/');
    } catch (error) {
      // Handle errors here
      messageApi.error('Lỗi! Xin hãy thử lại');
    }
  };

  return (
    <div
      id="forgottenPasswordDiv"
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #ff69b4, #ffffff)',
      }}
    >
      {contextHolder}
      <Space
        direction="vertical"
        size="large"
        style={{
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Title>Quên mật khẩu</Title>
        <Input
          size="large"
          placeholder="Email"
          prefix={<UserOutlined />}
          name="email"
          onChange={handleChange}
        />
        <Input
          size="large"
          placeholder="Mật khẩu mới"
          type={showPassword ? 'text' : 'password'}
          name="newPassword"
          onChange={handleChange}
          prefix={<ToolOutlined />}
          suffix={
            <Button
              icon={showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              onClick={handleTogglePassword}
            />
          }
        />
        <Input
          size="large"
          placeholder="Nhắc lại mật khẩu mới"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          onChange={handleChange}
          prefix={<ReloadOutlined />}
          suffix={
            <Button
              icon={showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              onClick={handleToggleConfirmPassword}
            />
          }
        />
        <div>
          <Button
            size="large"
            type="primary"
            style={{ float: 'right' }}
            onClick={handleConfirm}
          >
            Đồng ý
          </Button>
          <Button size="large" style={{ float: 'left' }} onClick={handleLogin}>
            <ArrowLeftOutlined />
            Đăng nhập
          </Button>
        </div>
      </Space>
    </div>
  );
}
