import React from 'react';
import { Col, Row, Typography } from 'antd';
import { Outlet } from 'react-router-dom';
import background from '../../../img/bg.jpg';

const { Title } = Typography;

export default function ResetPasswordLayout() {
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