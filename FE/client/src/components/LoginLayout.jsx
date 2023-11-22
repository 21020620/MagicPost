import React from 'react';
import { Col, Row, Typography } from 'antd';
import { Outlet } from 'react-router-dom';
import logo from '../img/icon.jpg';
import background from '../img/bg.jpg';

const { Title } = Typography;

export default function LoginLayout() {
  return (
    <Row style={{ minHeight: '100vh' }}>
      <Col xs={24} lg={8} style={{ textAlign: 'center', padding: '20px' }}>
        <div>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: '80px',
              height: '80px',
              marginBottom: '20px',
              float: 'left',
            }}
          />
          <div style={{ display: 'inline-block', marginLeft: '-170px', marginTop: '15px'}}>
            <Title level={2} style={{ color: 'black', marginBottom: '20px' }}>
              D's MagicPost
            </Title>
          </div>
          <Outlet />
        </div>
      </Col>
      <Col xs={24} lg={16} style={{ position: 'relative' }}>
        <img
          src={background}
          alt="backgroundPicture"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Col>
    </Row>
  );
}
