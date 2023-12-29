import React from 'react';
import { Col, Row, Typography } from 'antd';
import { Outlet } from 'react-router-dom';
import background from '../../../img/bg.jpg';

const { Title } = Typography;

export default function LoginLayout() {
  return (
    <div
      style={{
        margin: "0px",
        width: "100%",  // Set width to 100%
        height: "100%", // Set height to 100%
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
      }}
    >
      <Outlet/>
    </div>
  );
}
