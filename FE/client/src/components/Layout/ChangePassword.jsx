import { KeyOutlined, ToolOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Input, Space, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [formData, setFormData] = useState({});
  const [disabledButton, setDisabledButton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.rePassword ||
      formData.newPassword != formData.rePassword
    ) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Space
        direction="vertical"
        size="middle"
        style={{
          width: "50%",
          left: "10%",
          textAlign: "center",
        }}
      >
        <Input.Password
          size="large"
          placeholder="Current password"
          prefix={<KeyOutlined />}
          name="oldPassword"
          onChange={handleChange}
        />
        <Input.Password
          size="large"
          placeholder="New password"
          prefix={<ToolOutlined />}
          name="newPassword"
          onChange={handleChange}
        />
        <Input.Password
          size="large"
          placeholder="Retype new password"
          prefix={<UndoOutlined />}
          name="rePassword"
          onChange={handleChange}
        />
        <Button
          size="large"
          type="primary"
          style={{ float: "right" }}
          // onClick={handleOk}
          disabled= {disabledButton}
        >
          Change Password
        </Button>
      </Space>
    </div>
  );
}
