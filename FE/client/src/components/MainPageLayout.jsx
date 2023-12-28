import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import MyCarousel from "../common/MyCarousel";
import MyGridComponent from "../common/MyGridComponent";
import MyTitle from "../common/MyTitle";
import Title from "antd/es/typography/Title";

export default function MainPageLayout() {
  return (
    <div>
      <div id="Title">
        <Title
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "fit-content",
            padding: "20px 0 30px 0",
          }}
          level={1}
        >
          Trang chủ
        </Title>

        <Divider style={{ color: "red" }} />
      </div>

      <MyCarousel />
      <MyTitle text={"Phương thức hoạt động"}/>
      <MyGridComponent />
    </div>
  );
}
