import React from 'react';
import { Button, Input, Space, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchAPIPostLogin } from '../api/index';
import AppContext from '../components/AppContext';
import { validateEmail } from '../components/logic';
const { Title } = Typography;

export default function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const inputCheck = () => {
    if (loginData.email === '' || loginData.password === '') {
      messageApi.error('Xin nhập đầy đủ thông tin.');
      return false;
    }
    if (!validateEmail(loginData.email)) {
      messageApi.error('Email không hợp lệ!');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!inputCheck()) {
      return;
    }
    try {
      const res = await fetchAPIPostLogin(loginData);
      const response = await res.json();
      const { user: userData, message } = response;
      if (res.ok) {
        if (userData) {
          setUser(userData);
          if (userData.isAdmin) {
            navigate('/rv');
          } else {
            navigate('/centre');
          }
        }
      } else {
        messageApi.error(message);
      }
    } catch (error) {}
  };

  return (
    <div id="loginDiv" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {contextHolder}
      <Space direction="vertical" size="large" style={{ textAlign: 'center' }}>
        <Title>Đăng nhập</Title>

        <Input
          size="large"
          placeholder="Email"
          prefix={<UserOutlined />}
          name="email"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />

        <Input.Password
          size="large"
          placeholder="Mật khẩu"
          prefix={<LockOutlined />}
          name="password"
          onChange={handleChange}
          style={{ width: '100%' }}
          onKeyUp={handleKeyUp}
        />

        <Button size="large" type="primary" onClick={handleLogin}>
          Đăng nhập
        </Button>

        <NavLink to="/forgotten-password">Quên mật khẩu?</NavLink>
      </Space>
    </div>
  );
}
