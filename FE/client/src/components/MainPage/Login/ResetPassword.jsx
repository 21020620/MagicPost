import { KeyOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Input, Space, message } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAPIPutResetPassword } from "../../../api";

export default function ResetPassword() {
  const [messageApi, contextHolder] = message.useMessage();
  const { token } = useParams();
  const [formData, setFormData] = useState({});
  const [display, setDisplay] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !formData.password ||
      !formData.rePassword ||
      formData.password != formData.rePassword
    ) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOk = async () => {
    const res = await fetchAPIPutResetPassword(
      { password: formData.password },
      token
    );
    const response = await res.json();
    const { message } = response;

    if (res.ok) {
      setDisplay(true);
      messageApi.success(message);

      const timeout = setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      messageApi.error(message);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {contextHolder}
      <Space
        direction="vertical"
        size="large"
        style={{ textAlign: 'center', borderRadius: "10px", backgroundColor: "white", width: "400px", height: "350px" }}
      >
        <Title>Lấy lại mật khẩu</Title>
        <b style={{ color: "green", display: display ? "block" : "none" }}>
          Lấy lại mật khẩu thành công! Xin mời đăng nhập lại.
        </b>
        <Input.Password
          size="large"
          placeholder="Mật khẩu"
          prefix={<KeyOutlined />}
          name="password"
          onChange={handleChange}
          style={{ width: '75%' }}
        />
        <Input.Password
          size="large"
          placeholder="Nhập lại mật khẩu"
          prefix={<UndoOutlined />}
          name="rePassword"
          onChange={handleChange}
          style={{ width: '75%' }}
        />
        <div>
          <Button
            size="large"
            type="primary"
            onClick={handleOk}
            disabled={disabledButton}
          >
            Xác nhận
          </Button>
        </div>
      </Space>
    </div>
  );
}
