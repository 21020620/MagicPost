import React from "react";
import {
  HomeOutlined,
  FileSearchOutlined,
  DollarOutlined,
  AuditOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../../../img/icon.png"
import { Divider, Button } from "antd";
import "../../footer.css";

export default function HomeHeader() {
  const navigate = useNavigate();
  const menuOptions = [
    {
      text: "Trang chủ",
      icon: <HomeOutlined />,
      onClick: () => navigate("/"), // Add the appropriate URL for each menu item
    },
    {
      text: "Về chúng tôi",
      icon: <AuditOutlined />,
      onClick: () => navigate("/about"), // Example: replace with the actual URL
    },
    {
      text: "Bảng giá",
      icon: <DollarOutlined />,
      onClick: () => navigate("/pricing"), // Example: replace with the actual URL
    },
    {
      text: "Tra cứu đơn hàng",
      icon: <FileSearchOutlined />,
      onClick: () => navigate("/search"), // Example: replace with the actual URL
    },
  ];

  return (
    <>
      <div style={{ position: "absolute", left: 10 }}>
        <img id="headerLogo" src={logo} alt="logo" style={{ width: 120, height: 120 }} />
      </div>
      <Divider />
        <div className="navbar-container">
          <div className="navbar-links-container">
            {menuOptions.map((option, index) => (
              <a
                key={index}
                href=""
                className="menu-option"
                onClick={option.onClick}
              >
                {option.icon}
                {option.text}
              </a>
            ))}
          </div>
          <Button
            size="large"
            className="button-hover"
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              height: 50,
              width: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <LoginOutlined style={{ marginRight: 8 }} />
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  maxWidth: 120,
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  lineHeight: 1.2,
                }}
              >
                Đăng nhập
              </span>
            </div>
          </Button>
        </div>
      {/* </Divider> */}
    </>
  );
}
