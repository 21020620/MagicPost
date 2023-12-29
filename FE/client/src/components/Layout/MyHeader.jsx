import { Button, Dropdown } from "antd";
import { LogoutOutlined, KeyOutlined, DownOutlined } from "@ant-design/icons";
import React, {useContext} from "react"
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";

export default function MyHeader({ username, userRole }) {
    const { setUser, user } = useContext(AppContext);
    const userType = user.isAdmin ? "" : "";
  
    const navigate = useNavigate();
  
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
  
    const onClick = async ({ key }) => {
      switch (key) {
        case "changePassword":
          const changePasswordPath = `/${userRole}/changePassword`;
          navigate(changePasswordPath);
          break;
        case "logOut":
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate('/');
          break;
        default:
          break;
      }
    };
  
    return (
      <>
        <div style={{ position: "absolute", left: 10 }}>
          
        </div>
        <div style={{ position: "absolute", right: 1, top: -15 }}>
          <Dropdown menu={{ items, onClick }}>
            <Button size="large" style={{ height: 60, width: 200 }}>
              <div style={{ fontWeight: "bold", fontSize: 15, maxWidth: 200, wordWrap: 'break-word', whiteSpace: 'normal', lineHeight: 1.2 }}>
                {username}
              </div>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </>
    );
  }