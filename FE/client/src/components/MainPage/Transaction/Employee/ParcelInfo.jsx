import QRCode from "react-qr-code";
import "../../../../App.css";
import { Table } from 'antd';
import dayjs from 'dayjs';
import React from "react";
import 'dayjs/locale/en';
import styles from '../../../Layout/RVHome/Searching.module.css';
import { useSelector } from "react-redux";
import icon from "../../../../img/icon.png";

const ParcelInfo = (props) => {
      const { user, workplace } = useSelector((state) => state.user);
      const additionalService = "No additional service"
      const str = props.formData.fee;
      const numbers = str.match(/\d+/g).map(Number);
      let total = numbers.reduce((sum, num) => sum + parseInt(num), 0);
      const deliveryFare = [
      {    
        index: 'a',
        title: "Main Fee",
        value: numbers[0]
      },
      {    
        index: 'b',
        title: "Sub Fee",
        value: numbers[1]
      },
      {    
        index: 'c',
        title: "Transport Fee",
        value: numbers[2]
      },
      {    
        index: 'd',
        title: "Additional Fee",
        value: numbers[3]
      },
      {    
        index: 'e',
        title: "Total Fee (include VAT)",
        value: numbers[4]
      }
    ]
    const recipientFare = [
      {
        title: "COD",
        value: "0", 
      },
      {
        title: "Additional Fee",
        value: "0", 
      },
      {
        title: "Exchange",
        value: parseInt(props.formData.feeReceived) - total, 
      },
    ];
      const weight = [{
        title: "Actual weight:",
        value: props.formData.weight
      },
    ]
      const delivered = true;
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
      console.log('FormData: ', props.formData),

      <div id="parcel-info-container" className={styles['parcel-information']}>
        <img src={icon} alt="Icon" className={styles.icon} style={{width: '100px', height: '100px'}} />
        <h2>Parcel Information: {props.formData.id}</h2>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <div className={styles.header}>
              <p>
                <b>1. Sender's name and address</b>
              </p>
              <p>
                {props.formData.sender.fullName}
              <br />
                {props.formData.sender.address}
              </p>
            </div>
            <div>
              <p>
                <b>Phone number:</b> {props.formData.senderPhone}
              </p>
              <div className={styles.code}>
                <p>
                  <b>Customer Id:</b> {props.formData.sender.customerID}
                </p>
                <p>
                  <b>Postal Code:</b> {workplace.postalCode}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.header}>
              <p>
                <b>2. Recipient's name and address</b>
              </p>
              <p>
                {props.formData.receiver.fullName}
                <br />
                {props.formData.receiver.address}
              </p>
            </div>
            <div>
              <p>
                <b>Parcel ID:</b> {props.formData.id}
              </p>
              <div className={styles.code}>
                <p>
                  <b>Phone Number:</b> {props.formData.receiverPhone}
                </p>
              </div>
            </div>
          </div>
          <div className={styles['box-3']}>
            <div className={styles.section}>
              <div className={styles['parcel-type']}>
                <p>
                  <b>3. Type of parcel</b>
                </p>
  
                <div className={styles['check-box-group']}>
                  <label className={styles.checkBox}>
                    <input
                      type="checkbox"
                      className={styles.input}
                      checked={props.formData.itemType === true}
                      disabled
                    />
                    <span className={styles['custom-checkbox']}></span>
                    Document
                  </label>
                  <label className={styles.checkBox}>
                    <input
                      type="checkbox"
                      className={styles.input}
                      checked={props.formData.itemType === false}
                      disabled
                    />
                    <span className={styles['custom-checkbox']}></span>
                    Good
                  </label>
                </div>
              </div>
              <div className={styles['parcel-value']}>
                <p>
                  <b>4. Parcel value content</b>
                </p>
                {/* <TrackingParcelValueTable parcelValues={parcelValues} /> */}
              </div>
              <div className={styles['parcel-service']}>
                <p>
                  <b>5. Additional / Special services</b>
                </p>
                <p>{additionalService}</p>
                <p style={{ fontSize: "1.2rem" }}>Contact Code: EMSC/PPA</p>
              </div>
            </div>
            <div className={styles['sender-instruction']}>
              <p>
                <b>6. Sender's instructions for undeliverable parcel</b>
              </p>
              <div className={styles['check-box-group']}>
                <label className={styles.checkBox}>
                  <input
                    type="checkbox"
                    className={styles.input}
                    checked={props.formData.cannotSend == 1}
                    disabled
                  />
                  <span className={styles['custom-checkbox']}></span>
                  Return immediately
                </label>
                <label className={styles.checkBox}>
                  <input
                    type="checkbox"
                    className={styles.input}
                    checked={props.formData.cannotSend == 2}
                    disabled
                  />
                  <span className={styles['custom-checkbox']}></span>
                  Call sender/Transaction point
                </label>
                <label className={styles.checkBox}>
                  <input
                    type="checkbox"
                    className={styles.input}
                    checked={props.formData.cannotSend == 3}
                    disabled
                  />
                  <span className={styles['custom-checkbox']}></span>
                  Cancel order
                </label>
              </div>
              <div className={styles['check-box-group']}>
                <label className={styles.checkBox}>
                  <input
                    type="checkbox"
                    className={styles.input}
                    checked={props.formData.cannotSend == 4}
                    disabled
                  />
                  <span className={styles['custom-checkbox']}></span>
                  Return before date
                </label>
                <label className={styles.checkBox}>
                  <input
                    type="checkbox"
                    className={styles.input}
                    checked={props.formData.cannotSend == 5}
                    disabled
                  />
                  <span className={styles['custom-checkbox']}></span>
                  Return when storing time expired
                </label>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles['sender-commiment']}>
                <p>
                  <b>7. Sender's commiment</b>
                </p>
                <p>
                  I hereby acknowledge and accept the terms specified on the
                  reverse side of the delivery slip. I affirm that the contents of
                  this parcel comply with all safety regulations, and no
                  prohibited items are enclosed.
                </p>
              </div>
              <div className={styles['sender-signature']}>
                <div className={styles.date}>
                  <p>
                    <b>8. Date of Sending</b>
                  </p>
                  <p>{dayjs(props.formData.date).format('YYYY-MM-DD')} | {dayjs(props.formData.time).format('HH:mm')}</p>
                </div>
                <div className={styles.signature}>
                  <p>
                    <b>Sender's signature</b>
                  </p>
                  <p>
                    <i>
                      {props.formData.sender.fullName
                        ?.split(' ')[0]
                        .replace(/\s+/g, "")
                        .toLowerCase()}
                    </i>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['box-4']}>
            <div className={styles.section}>
              <div className={styles.left}>
                <div className={styles['delivery-fare']}>
                  <p>
                    <b>9. Delivery fare:</b>
                  </p>
                  {deliveryFare.map((fare, index) => {
                    return (
                      <div className={styles.fare} key={index}>
                        <p>
                          {fare.index}. {fare.title}
                        </p>
                        <p>{fare.value}</p>
                      </div>
                    );
                  })}
                </div>
                <div className={styles['recipient-fare']}>
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
                <div className={styles['parcel-weight']}>
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
                <div className={styles['parcel-note']}>
                  <p>
                    <b>12. Notes</b>
                  </p>
                  <p>{props.formData.deliverNote}</p>
                </div>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles['parcel-approval']}>
                <p>
                  <b>13. Post office approval</b>
                </p>
                <p>{user.firstName} {user.lastName}</p>
                {/* <img src={approvedImg} alt="post office aproval" width="110px" /> */}
                <p>
                  {/* <i>{paths[0]?.user_name}</i> */}
                </p>
              </div>
              <div className={styles['delivery-date']}>
                <p>
                  <b>14. Received date</b>
                </p>
                <p>{}</p>
                <p style={{fontSize: "1.1rem"}}>Recipient's signature</p>
                {delivered && (
                  <p>
                    <i>
                    </i>
                  </p>
                )}
                <div className={styles['qr-code']}>
          <QRCode
            size={64}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`http://localhost:8080/tracking?parcelId=${props.formData.id}`}
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
  
  export default ParcelInfo;