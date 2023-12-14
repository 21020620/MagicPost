import { Button, Input, Space, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { fetchAPIPostLogin } from '../api/index';
import axios from 'axios';
import AppContext from '../components/AppContext';
=======
>>>>>>> ae585027f7c54ddf0eecf32a4114f050b6c9b7e0
import { validateEmail } from '../components/logic';
import axios from 'axios';

const { Title } = Typography;

export default function Login() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
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
    if (loginData.username === '' || loginData.password === '') {
      messageApi.error('Xin nhập đầy đủ thông tin.');
      return false;
    }
    if (!validateEmail(loginData.username)) {
      messageApi.error('Email không hợp lệ!');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!inputCheck()) {
      return;
    }

    const loginAxios = axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 50000,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    try {
<<<<<<< HEAD
      // Fetch dữ liệu từ file JSON
      const response = await axios.get('https://65661dcbeb8bb4b70ef2ecce.mockapi.io/api/v1/login');
      const userData = response.data;
=======
      let isLoggedIn = false;
      console.log(loginData);
      localStorage.getItem('token') ? localStorage.removeItem('token') : null;
      await loginAxios.post('/login', loginData)
        .then(res => {
          isLoggedIn = true;
          console.log("User logged in successfully!");
          localStorage.setItem('token', res.data.token);
        })
        .catch(err => {
          console.log(err);
        })
>>>>>>> ae585027f7c54ddf0eecf32a4114f050b6c9b7e0

      if (isLoggedIn) {
        navigate('/CEO');
      } else {
        messageApi.error('Tên đăng nhập hoặc mật khẩu không đúng.');
      }
    } catch (error) {
      console.error('Lỗi khi đọc dữ liệu từ file JSON', error);
    }
  };

  return (
    <div id="loginDiv" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {contextHolder}
      <Space direction="vertical" size="large"
        style={{ textAlign: 'center', borderRadius: "10px", backgroundColor: "white", width: "400px", height: "350px" }}>
        <Title>Đăng nhập</Title>

        <Input
          size="large"
          placeholder="Email"
          prefix={<UserOutlined />}
          name="username"
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
