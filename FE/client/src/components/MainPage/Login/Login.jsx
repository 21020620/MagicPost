// Import necessary components and functions from Ant Design, React, and Redux
import { Button, Input, Space, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../logic';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/user.js';

// Destructure components from Ant Design Typography
const { Title } = Typography;

// Define the Login component
export default function Login() {
  // State to hold the login data (username and password)
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  
  // React Router hook to navigate between pages
  const navigate = useNavigate();

  // Ant Design message component and hook for displaying messages
  const [messageApi, contextHolder] = message.useMessage();

  // Redux hooks to access user and workplace data from the global state
  const { user, workplace } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Handle changes in input fields
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle key up events (e.g., Enter key) for triggering login
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // Validate input data before attempting login
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

  // Handle the login process
  const handleLogin = async () => {
    // Check for valid input before proceeding
    if (!inputCheck()) {
      return;
    }

    // Axios instance for making HTTP requests to the server
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

      // Send a login request to the server
      await loginAxios.post('/login', loginData)
        .then(res => {
          const response = res.data;
          isLoggedIn = true;

          // Save the user's token in local storage and dispatch the login action
          localStorage.setItem('token', response.token);
          dispatch(login(response));

          // Log information for debugging
          console.log("User logged in successfully!");
          console.log('response: ', response);
          role = response.role;
          console.log('user: ', user);
          console.log('workplace: ', workplace);
        })
        .catch(err => {
          // Log any errors that occur during the login process
          console.log(err);
        })

      // Based on the user's role, navigate to the appropriate page
      if (isLoggedIn) {
        if(role === 'cpointm') navigate('/Central');
        else if(role === 'tpointm') navigate('/Transaction');
        else if (role === 'admin') navigate('/CEO');
        else if (role === 'cpointw') navigate('/CE')
        else navigate('/TE');
      } else {
        // Display an error message if login fails
        messageApi.error('Tên đăng nhập hoặc mật khẩu không đúng.');
      }
    } catch (error) {
      // Log any general errors that occur during the login process
      console.error('Lỗi khi đọc dữ liệu từ file JSON', error);
    }
  };

  // Render the login form
  return (
    <div id="loginDiv" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {contextHolder}
      <Space direction="vertical" size="large"
        style={{ textAlign: 'center', borderRadius: "10px", backgroundColor: "white", width: "400px", height: "350px" }}>
        <Title>Đăng nhập</Title>

        {/* Input field for the username (email) */}
        <Input
          size="large"
          placeholder="Email"
          prefix={<UserOutlined />}
          name="username"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          style={{ width: '75%' }}
        />

        {/* Input field for the password with eye icon for visibility toggle */}
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

        {/* Button to trigger the login process */}
        <Button size="large" type="primary" onClick={handleLogin}>
          Đăng nhập
        </Button>

        {/* Link to the "Forget Password" page */}
        <NavLink to="/login/forget">Quên mật khẩu?</NavLink>
        {/* Additional link (commented out) for a "Reset Password" page */}
        {/* <NavLink to="/login/reset-password">Reset password</NavLink> */}
      </Space>
    </div>
  );
}
