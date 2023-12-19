import { Carousel } from "antd";
import React from "react";

import carousel1 from "../img/carousel1.jpg";
import carousel2 from "../img/carousel2.jpg";
import carousel3 from "../img/carousel3.jpg";

export default function MyCarousel() {
  return (
    <div
      style={{
        width: "80%",
        boxShadow: "0 0 5px ",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Carousel autoplay>
        <div style={{ position: "relative" }}>
          <img src={carousel1} alt="carousel1" style={{ width: "100%" }} />
          <div style={{ position: "absolute", left: 0, right: 0 }}>
            {" "}
            100000000
          </div>
        </div>
        <div>
          <img src={carousel2} alt="carousel2" style={{ width: "100%" }} />
        </div>
        <div>
          <img src={carousel3} alt="carousel3" style={{ width: "100%" }} />
        </div>
      </Carousel>
    </div>
  );
}
