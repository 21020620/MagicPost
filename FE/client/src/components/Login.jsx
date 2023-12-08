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
      // Fetch dữ liệu từ file JSON
      const response = await fetch('https://65661dcbeb8bb4b70ef2ecce.mockapi.io/api/v1/login');
      const userData = await response.json();


      // Kiểm tra dữ liệu đăng nhập với tất cả các đối tượng trong mảng userData
      const matchedUser = userData.find(
        (user) =>
          user.username === loginData.email && user.password === loginData.password
      );

      if (matchedUser) {
        // Dữ liệu đúng, chuyển hướng đến trang chủ Google
        navigate('/CEO');
      } else {
        messageApi.error('Tên đăng nhập hoặc mật khẩu không đúng.');
      }
    } catch (error) {
      console.error('Lỗi khi đọc dữ liệu từ file JSON', error);
    }
  };

  return (
    <div id="loginDiv" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      {contextHolder}
      <Space direction="vertical" size="large" 
      style={{ textAlign: 'center', borderRadius: "10px", backgroundColor: "white", width: "400px", height: "350px"}}>
        <Title>Đăng nhập</Title>

        <Input
          size="large"
          placeholder="Email"
          prefix={<UserOutlined />}
          name="email"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          style={{ width: '75%' }}
        />

        <Input.Password
          size="large"
          placeholder="Mật khẩu"
          prefix={<LockOutlined />}
          name="password"
          onChange={handleChange}
          style={{ width: '75%' }}
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
