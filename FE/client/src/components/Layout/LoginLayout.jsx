import React from 'react';
import { Col, Row, Typography } from 'antd';
import { Outlet } from 'react-router-dom';
//import logo from '../img/icon.jpg';
import background from '../../img/bg.jpg';

const { Title } = Typography;

export default function LoginLayout() {
  return (
    <div
      style={{
        margin: "-10px",
        width: "1500px",
        height: "800px",
        backgroundImage: `url(${background})`
      }}
    >
      <Outlet/>
    </div>
  );
}
