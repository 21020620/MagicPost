import React, { useEffect, useState } from "react";
import MyCarousel from "../../../common/MyCarousel";
import MyGridComponent from "../../../common/MyGridComponent";
import MyTitle from "../../../common/MyTitle";
export default function RVHome() {
  return (
    <div>
      <MyCarousel />
      <MyTitle text="Phương thức hoạt động" />
      <MyGridComponent />
    </div>
  );
}
