import React from "react";
import "../footer.css";
import {
  EnvironmentFilled,
  MailFilled,
  PhoneFilled,
  PushpinFilled,
} from "@ant-design/icons";

export default function HomeFooter() {
  return (
    <div className="footer">
      <div className="footer-left">
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ fontSize: 24 }}>
            <strong>Công ty cổ phần giao hàng MagicPost</strong>
          </li>
          <li>
            Maggic Post là doanh nghiệp hàng đầu cung cấp dịch vụ chuyển phát
            nhanh hàng hoá, bưu kiện trong nước, quốc tế tại Việt Nam.
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <PushpinFilled style={{ color: "red" }} />
                Giấy chứng nhận Đăng ký Kinh doanh số: 0104093672 do Phòng ĐKKD
                Thành phố Hà Nội Cấp lần đầu ngày 03/07/2009
              </li>
              <br />
            </ul>
          </li>
         
        </ul>
      </div>
      <div className="footer-right">
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li style={{ fontSize: 24 }}>
            <strong>Thông tin liên hệ</strong>
          </li>
          <li>
            <EnvironmentFilled style={{ color: "red" }} />
            <strong>Trụ sở chính:</strong>
            <a
              href="https://goo.gl/maps/srZTEraEbkfE7pBX6"
              style={{ color: "grey" }}
            >
              {" "}
              Tòa nhà VTV, số 8 Đường Phạm Hùng, Phường Mễ Trì, Quận Nam Từ
              Liêm, Hà Nội
            </a>
          </li>
          <li>
            <PhoneFilled style={{ color: "red" }} />
            <strong>Hotline:</strong> +84.24.37684714
          </li>
          <li>
            <MailFilled style={{ color: "red" }} />
            <strong>Email:</strong> kinhdoanh@magicpost.com
          </li>
        </ul>
      </div>
    </div>
  );
}
