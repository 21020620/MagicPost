import { NavLink } from 'react-router-dom';
import {HomeOutlined, BarChartOutlined} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Outlet } from "react-router-dom";
import logo from "../../img/icon.png"
import MyHeader from './MyHeader';
import MyFooter from './MyFooter';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const menuItems = [
  getItem(
    <NavLink to="/CEO">Trang chủ</NavLink>, "1", <HomeOutlined />
  ),

  getItem(
    "Quản lý điểm", "sub2", <HomeOutlined />, [
      getItem(
        <NavLink to="/CEO/central">Điểm tập kết</NavLink>,
        "2",
        <HomeOutlined />
      ),
      getItem(
        <NavLink to="/CEO/transaction">Điểm giao dịch</NavLink>,
        "3",
        <HomeOutlined />
      ),
    ]
  ),

  getItem(
    <NavLink to="/CEO/account">Quản lý tài khoản</NavLink>, "4", <HomeOutlined />
  ),

  getItem(  
    <NavLink to="/CEO/statistic">Thống kê</NavLink>, "5", <BarChartOutlined />
  ),
];
  
const CEOLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical">
          <img src={logo} alt="logo" 
              style={{
                width: "60px",
                height: "60px",
                marginLeft: "50px",
              }}
          />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            margin: "-10px -10px 0px -10px",
            background: colorBgContainer,
          }}
        >
          <MyHeader username={"CEO"} userRole="CEO"/>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer
          style={{
            backgroundColor: "#F5F5F5",
          }}
        >
          <MyFooter />
        </Footer>
      </Layout>
    </Layout>
  );
};
export default CEOLayout;