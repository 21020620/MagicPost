import QRCode from "react-qr-code";
import { Table } from 'antd';
import styles from "./Searching.module.css";


function TrackingParcelInformation() {
  const senderInfo = {
    nameAddress: "Nhà hát chèo",
    phoneNum: 123456789,
    customerId: 1245,
  };
  const recipientInfo = {
    nameAddress: "Viet Nam",
    phoneNum: 1234598796,
  };

  const parcelId = 100;
  const typeOfParcel = {
    isDocument: true,
  };

  const senderInstruction = {
    returnImmediately: false,
    callRecipient: false,
    cancel: false,
    returnBefore: false,
    returnAfterStorage: false,
  };
  const additionalService = "no additional service";
  const deliveryFare = [
    {
      title: "Cước chính",
      value: "5",
    },
    {
      title: "Cước phụ",
      value: "1", 
    },
    {
      title: "Tổng VAT",
      value: "1", 
    },
    {
      title: "Tổng thu",
      value: "7", 
    },
  ];
  const recipientFare = [
    {
      title: "COD",
      value: "2", 
    },
    {
      title: "Thu khác",
      value: "2", 
    },
    {
      title: "Phụ phí",
      value: "1", 
    },
  ];
  const weight = [
    {
      title: "thuc te",
      value: 100,
    },
    {
      title: "quy doi",
      value: 120,
    },
  ];
  const delivered = true;
  const notes = "Hoang rat dep trai nhe ae";
  const parcelColumns = ["Nội dung", "Số lượng", "Trị giá", "Giấy tờ đính kèm"];

  const columns = [
    {
      title: <strong>Nội dung</strong>,
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: <strong>Số lượng</strong>,
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: <strong>Trị giá</strong>,
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: <strong>Giấy tờ đính kèm</strong>,
      dataIndex: 'attachment',
      key: 'attachment',
    },
  ];

  const data = [
    {
      key: '1',
      content: '1',
      quantity: '2',
      value: '3',
      attachment: '4',
    },
  ];
  const tableProps = {
    columns,
    dataSource: data,
    bordered: true,
    pagination: false, 
  };
  return (
    <div className={styles.parcel-information}>
      <h2>Parcel Information</h2>
      <div className={styles.boxes}>
        <div className={styles.box}>
          <div className={styles.header}>
            <p>
              <b>1. Sender's name and address</b>
            </p>
            <p>{senderInfo.nameAddress}</p>
          </div>
          <div>
            <p>
              <b>Phone number:</b> {senderInfo.phoneNum}
            </p>
            <div className={styles.code}>
              <p>
                <b>Customer Id:</b> {senderInfo.customerId}
              </p>
              <p>
                <b>Postal Code:</b> 1000
              </p>
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.header}>
            <p>
              <b>2. Recipient's name and address</b>
            </p>
            <p>{recipientInfo.nameAddress}</p>
          </div>
          <div>
            <p>
              <b>Parcel Id:</b> #{parcelId}
            </p>
            <div className={styles.code}>
              <p>
                <b>Phone Number:</b> {recipientInfo.phoneNum}
              </p>
              <p>
                <b>Postal Code:</b> 1000
              </p>
            </div>
          </div>
        </div>
        <div className={styles.box-3}>
          <div className={styles.section}>
            <div className={styles.parcel-type}>
              <p>
                <b>3. Type of parcel</b>
              </p>

              <div className={styles.check-box-group}>
                <label className={styles.checkBox}>
                  <input
                    type="checkbox"
                    className={styles.input}
                    checked={!typeOfParcel.isDocument}
                    disabled
                  />
                  <span className={styles.custom-checkbox}></span>
                  Document
                </label>
                <label className={styles.checkBox}>
                  <input
                    type="checkbox"
                    className={styles.input}
                    checked={!typeOfParcel.isDocument}
                    disabled
                  />
                  <span className={styles.custom-checkbox}></span>
                  Package
                </label>
              </div>
            </div>
            <div className={styles.parcel-value}>
              <p>
                <b>4. Parcel value content</b>
              </p>
              <Table {...tableProps} />
            </div>
            <div className={styles.parcel-service}>
              <p>
                <b>5. Additional / Special services</b>
              </p>
              <p>{additionalService}</p>
              <p style={{ fontSize: "1.2rem" }}>Contact Code: EMSC/PPA</p>
            </div>
          </div>
          <div className={styles.sender-instruction}>
            <p>
              <b>6. Sender's instructions for undeliverable parcel</b>
            </p>
            <div className={styles.check-box-group}>
              <label className={styles.checkBox}>
                <input
                  type="checkbox"
                  className={styles.input}
                  checked={senderInstruction.returnImmediately}
                  disabled
                />
                <span className={styles.custom-checkbox}></span>
                Return immediately
              </label>
              <label className={styles.checkBox}>
                <input
                  type="checkbox"
                  className={styles.input}
                  checked={senderInstruction.callRecipient}
                  disabled
                />
                <span className={styles.custom-checkbox}></span>
                Call the recipient
              </label>
              <label className={styles.checkBox}>
                <input
                  type="checkbox"
                  className={styles.input}
                  checked={senderInstruction.cancel}
                  disabled
                />
                <span className={styles.custom-checkbox}></span>
                Cancel
              </label>
            </div>
            <div className={styles.check-box-group}>
              <label className={styles.checkBox}>
                <input
                  type="checkbox"
                  className={styles.input}
                  checked={senderInstruction.returnBefore}
                  disabled
                />
                <span className={styles.custom-checkbox}></span>
                Return before Sep 6th
              </label>
              <label className={styles.checkBox}>
                <input
                  type="checkbox"
                  className={styles.input}
                  checked={senderInstruction.returnAfterStorage}
                  disabled
                />
                <span className={styles.custom-checkbox}></span>
                Return at the end of storage period
              </label>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sender-commiment}>
              <p>
                <b>7. Sender's commiment</b>
              </p>
              <p>
                I hereby acknowledge and accept the terms specified on the
                reverse side of the delivery slip. I affirm that the contents of
                this parcel comply with all safety regulations, and no
                prohibited items are enclosed.
                {/* In the event that delivery is unsuccessful, kindly refer to
              the guidelines outlined in section 6, and I commit to
              covering any associated shipping fees. */}
              </p>
            </div>
            <div className={styles.sender-signature}>
              <div className={styles.date}>
                <p>
                  <b>8. Date of Sending</b>
                </p>
                <p>paths[0].time.timeArrived</p>
              </div>
              <div className={styles.signature}>
                <p>
                  <b>Sender's signature</b>
                </p>
                <p>
                  <i>
                    {senderInfo.nameAddress
                      ?.split(".")[0]
                      .replace(/\s+/g, "")
                      .toLowerCase()}
                  </i>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.box-4}>
          <div className={styles.section}>
            <div className={styles.left}>
              <div className={styles.delivery-fare}>
                <p>
                  <b>9. Delivery fare:</b>
                </p>
                {deliveryFare.map((fare, index) => {
                  return (
                    <div className={styles.fare} key={index}>
                      <p>
                        {fare.title}
                      </p>
                      <p>{fare.value}</p>
                    </div>
                  );
                })}
              </div>
              <div className={styles.recipient-fare}>
                <p>
                  <b>11. Recipient's fare:</b>
                </p>
                {recipientFare.map((fare, index) => {
                  return (
                    <div className={styles.fare} key={index}>
                      <p>{fare.title}</p>
                      <p>{fare.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.parcel-weight}>
                <p>
                  <b>10. Weight (kg):</b>
                </p>
                {weight.map((weight, index) => {
                  return (
                    <div className={styles.weight} key={index}>
                      <p>{weight.title}</p>
                      <p>{weight.value}</p>
                    </div>
                  );
                })}
              </div>
              <div className={styles.parcel-note}>
                <p>
                  <b>12. Notes</b>
                </p>
                <p>{notes}</p>
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.parcel-approval}>
              <p>
                <b>13. Post office approval</b>
              </p>
              <p>Receiving clerk's signature</p>
              {/* <img src={approvedImg} alt="post office aproval" width="110px" /> */}
              <p>{/* <i>{paths[0]?.user_name}</i> */}</p>
            </div>
            <div className={styles.delivery-date}>
              <p>
                <b>14. Received date</b>
              </p>
              <p>{`${
                delivered
                  ? false /*paths[3].time*/ ?? "Delivered"
                  : "Not delivered"
              }`}</p>
              <p style={{ fontSize: "1.1rem" }}>Recipient's signature</p>
              {delivered && (
                <p>
                  <i>
                    {recipientInfo.nameAddress
                      ?.split(".")[0]
                      .replace(/\s+/g, "")
                      .toLowerCase()}
                  </i>
                </p>
              )}
              <div className={styles.qr-code}>
                <QRCode
                  size={64}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={`http://localhost:3000/tracking?parcelId=${parcelId}`}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackingParcelInformation;
