import React, { useState, useEffect } from "react";
import {
  HomeOutlined,
  FileSearchOutlined,
  DollarCircleOutlined,
  AuditOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../../../img/icon.png";
import { Divider, Button } from "antd";
import "../../footer.css";


export default function HomeHeader() {
  const navigate = useNavigate();
  const menuOptions = [
    {
      text: "Trang chủ",
      icon: <HomeOutlined />,
      onClick: () => navigate("/"),
    },
    {
      text: "Về chúng tôi",
      icon: <AuditOutlined />,
      onClick: () => navigate("/about"),
    },
    {
      text: "Tra cứu vận đơn",
      icon: <FileSearchOutlined />,
      onClick: () => navigate("/search"),
    },
    {
      text: "Giá cước dịch vụ",
      icon: <DollarCircleOutlined />,
      onClick: () =>
        window.open(
          "https://drive.google.com/file/d/1SAVyehyUTDTp9IamGfi_OOKgKs-MKTUY/view?usp=sharing"
        ),
    },
  ];

  const handleLoginButtonClick = () => {
    navigate("/login");
  };
  const [visibleMenuOptions, setVisibleMenuOptions] = useState(menuOptions);

  useEffect(() => {
    const handleResize = () => {
      // Adjust the number of visible menu options based on window width
      const windowWidth = window.innerWidth;
  
      if (windowWidth < 1000) {
        setVisibleMenuOptions(menuOptions.slice(0, 3)); 
      } else if (windowWidth < 800) {
        setVisibleMenuOptions(menuOptions.slice(0, 2)); 
      } else if (windowWidth < 600) {
        setVisibleMenuOptions(menuOptions.slice(0, 1)); 
      } else {
        setVisibleMenuOptions(menuOptions); 
      }
    };
    handleResize();
  
    // Attach the event listener
    window.addEventListener("resize", handleResize);
  
    // Detach the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOptions]);

  return (
    <>
      <div style={{ position: "absolute", left: 10 }}>
        <img
          id="headerLogo"
          src={logo}
          alt="logo"
          style={{ width: 120, height: 120 }}
        />
      </div>
      <Divider />
      <div className="navbar-container">
        <div className="navbar-links-container">
          {visibleMenuOptions.map((option, index) => (
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
          onClick={handleLoginButtonClick}
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
    </>
  );
}
