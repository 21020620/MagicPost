import "./footer.css";
import { NavLink } from "react-router-dom";
import { Layout, theme } from "antd";
import { useContext } from "react";
const { Header, Content, Footer } = Layout;
import { Outlet } from "react-router-dom";
import HomeFooter from "./HomeFooter"
import HomeHeader from "./HomeHeader";
import AppContext from "../../AppContext";

export default function CenLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user } = useContext(AppContext);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header
        className="header"
        style={{
          height: 100,
          backgroundColor: "#EE0000",
          position: "relative",
          boxShadow: "0px 0px 8px",
        }}
      >
        <HomeHeader username={user.name} />
      </Header>
      <Layout className="site-layout" style={{ background: "#d4effd" }}>
        <Content
          style={{
            // margin: "20px 20px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: "100vh",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
      <Footer>
        <HomeFooter />
      </Footer>
    </Layout>
  );
}
