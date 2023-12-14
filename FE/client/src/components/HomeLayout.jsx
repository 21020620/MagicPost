import React, { useEffect, useState } from "react";
import { Divider, Carousel } from "antd";
import Title from "antd/es/typography/Title";
import imgEX from "../img/bg.jpg";

export default function HomeLayout (){
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

            {/* <div id="image"
                style={{
                    width: "80%",
                    boxShadow: "0 0 5px ",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
            >
                <img src={imgEX} alt="test" style={{width: "100%"}} />
            </div> */}

            <Carousel autoplay>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
            </Carousel>
        </div>
    );
};