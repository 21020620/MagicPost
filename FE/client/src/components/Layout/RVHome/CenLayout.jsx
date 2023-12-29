import "../../footer.css";
import { Layout, theme } from "antd";
import { useContext } from "react";
const { Header, Content, Footer } = Layout;
import { Outlet } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import HomeFooter from "../MyFooter";
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
          // backgroundColor: "#26205c",
          position: "relative",
          boxShadow: "0px 0px 8px",
        }}
      >
        <HomeHeader />
      </Header>
      <Layout >
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
