import React from "react";
import { Layout, Menu } from "antd";
import "./footer.css"; // Assuming this is the correct import for styling
const { Sider } = Layout;

// MySider component renders a layout with a sidebar
// It takes an array of 'items' for the Menu component
const MySider = ({ items }) => {
  return (
    <Layout>
      {/* Sidebar (Sider) component */}
      <Sider>
        {/* Logo or any other content for the sidebar */}
        <div className="demo-logo-vertical" />
        
        {/* Menu component with dark theme and provided 'items' */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']} // Assuming you have a default selected key
          items={items} // The 'items' prop for Menu
        />
      </Sider>
    </Layout>
  );
}

export default MySider;
