import React from "react";
import { Layout, Menu } from "antd";
//import reglogo from "../../img/reglogonobg.png";
import { useState } from "react";
import "./footer.css";
const { Sider, Header, Content } = Layout;

export default function MySider({ items }) {
  /* const [collapsed, setCollapsed] = useState(false);

  const [selectedKey, setSelectedKey] = useState(
    localStorage.getItem("selectedKey") || "1"
  );

  const clickItem = (e) => {
    localStorage.setItem("selectedKey", e.key);
    setSelectedKey(e.key);
  }; */

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
