import { Button, Dropdown, message } from "antd";
import { LogoutOutlined, KeyOutlined, DownOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";

// MyHeader component handles user-related actions
export default function MyHeader({ username, userRole }) {
  // Access user-related data from the AppContext
  const { setUser, user } = useContext(AppContext);
  const userType = user.isAdmin ? "" : "";
  const navigate = useNavigate();

  // Dropdown menu items for user actions
  const items = [
    {
      key: "changePassword",
      label: "Change Password",
      icon: <KeyOutlined />,
    },
    {
      key: "logOut",
      label: "Log Out",
      danger: true,
      icon: <LogoutOutlined />,
    },
  ];

  // Handle click events on dropdown items
  const onClick = async ({ key }) => {
    try {
      switch (key) {
        case "changePassword":
          // Redirect to the change password page
          const changePasswordPath = `/${userRole}/changePassword`;
          navigate(changePasswordPath);
          break;
        case "logOut":
          // Perform logout: clear local storage and user context
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          setUser(null);
          navigate('/');
          break;
        default:
          break;
      }
    } catch (error) {
      // Log and display an error message if an error occurs
      console.error("Error performing action:", error);
      message.error("An error occurred. Please try again.");
    }
  };

  // Render the header component
  return (
    <>
      <div style={{ position: "absolute", left: 10 }}></div>
      <div style={{ position: "absolute", right: 1, top: -15 }}>
        {/* Dropdown menu with user actions */}
        <Dropdown menu={{ items, onClick }}>
          <Button size="large" style={{ height: 60, width: 200 }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: 15,
                maxWidth: 200,
                wordWrap: "break-word",
                whiteSpace: "normal",
                lineHeight: 1.2,
              }}
            >
              {username}
            </div>
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </>
  );
}
