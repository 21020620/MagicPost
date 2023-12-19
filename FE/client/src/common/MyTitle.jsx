import { Divider } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

export default function MyTitle({ text }) {
  return (
    <div>
      <Title
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "fit-content",
          padding: "20px 0 30px 0",
          color: "red",
          textAlign: "center",
        }}
        level={1}
      >
        {text}
      </Title>
    </div>
  );
}
