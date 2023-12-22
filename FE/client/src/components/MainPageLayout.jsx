import React, { useEffect, useState } from "react";
import { Divider, Carousel } from "antd";
import Title from "antd/es/typography/Title";

export default function MainPageLayout (){
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