import { Button, Input, Space, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../logic';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/user.js';

const { Title } = Typography;

export default function Login() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { user, workplace } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
      let isLoggedIn = false;
      let role = '';
      await loginAxios.post('/login', loginData)
        .then(res => {
          const response = res.data;
          isLoggedIn = true;
          console.log("User logged in successfully!");
          localStorage.setItem('token', response.token);
          dispatch(login(response));
          console.log('response: ', response);
          role = response.role;
          console.log('user: ', user);
          console.log('workplace: ', workplace);
        })
        .catch(err => {
          console.log(err);
        })

      if (isLoggedIn) {
        if(role === 'cpointm') navigate('/Central');
        else if(role === 'tpointm') navigate('/Transaction');
        else if (role === 'admin') navigate('/CEO');
        else if (role === 'cpointw') navigate ('/CE')
        else navigate('/TE');
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
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />

        <Button size="large" type="primary" onClick={handleLogin}>
          Đăng nhập
        </Button>

        <NavLink to="/login/forget">Quên mật khẩu?</NavLink>
        <NavLink to="/login/reset-password">Reset password</NavLink>
      </Space>
    </div>
  );
}
