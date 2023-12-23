import React from "react";
import { Layout, Menu } from "antd";
import "./footer.css";
const { Sider, Header, Content } = Layout;

export default function MySider({ items }) {

  return (
    <Layout>
      <Sider>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
        />
      </Sider>
    </Layout>
  );
}
