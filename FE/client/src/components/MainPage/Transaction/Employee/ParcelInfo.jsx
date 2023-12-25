import QRCode from "react-qr-code";
import "../../../../App.css"

function ParcelInfo(props) {
      const senderInfo = {
        nameAddress: "Nhà hát chèo",
        phoneNum: 123456789,
        customerId: 1245,
      }
      const recipientInfo = {
        nameAddress: "Viet Nam",
        phoneNum: 1234598796,
      }

      const parcelId = 100
      const typeOfParcel =  {
        isDocument: true
      }

      const senderInstruction = {
        returnImmediately: false,
        callRecipient: false,
        cancel: false,
        returnBefore: false,
        returnAfterStorage: false,
      }
      const additionalService = "no additional service"
      const deliveryFare = [{    
        index: 13,
        title: "cuoc chinh",
        value: "5"
      }]
      const recipientFare = [{
        title: "exchange",
        value: "4"
      }]
      const weight = [{
        title: "thuc te",
        value: props.formData.weight
      },
      {
        title: "quy doi",
        value: 120
      },
    ]
      const delivered = true;
      const notes = "Hoang rat dep trai nhe ae"
    return (
      <div className="parcel-information">
        <h2>Parcel Information</h2>
        <div className="boxes">
          <div className="box">
            <div className="header">
              <p>
                <b>1. Sender's name and address</b>
              </p>
              <p>{props.formData.senderInfo}</p>
            </div>
            <div>
              <p>
                <b>Phone number:</b> {props.formData.senderPhone}
              </p>
              <div className="code">
                <p>
                  <b>Customer Id:</b> {senderInfo.customerId}
                </p>
                <p>
                  <b>Postal Code:</b> 1000
                </p>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="header">
              <p>
                <b>2. Recipient's name and address</b>
              </p>
              <p>{props.formData.receiverInfo}</p>
            </div>
            <div>
              <p>
                <b>Parcel Id:</b> #{parcelId}
              </p>
              <div className="code">
                <p>
                  <b>Phone Number:</b> {props.formData.receiverPhone}
                </p>
                <p>
                  <b>Postal Code:</b> 1000
                </p>
              </div>
            </div>
          </div>
          <div className="box-3">
            <div className="section">
              <div className="parcel-type">
                <p>
                  <b>3. Type of parcel</b>
                </p>
  
                <div className="check-box-group">
                  <label className="checkBox">
                    <input
                      type="checkbox"
                      className="input"
                      checked={props.formData.orderType === 'Document'}
                      disabled
                    />
                    <span className="custom-checkbox"></span>
                    Document
                  </label>
                  <label className="checkBox">
                    <input
                      type="checkbox"
                      className="input"
                      checked={props.formData.orderType === 'Good'}
                      disabled
                    />
                    <span className="custom-checkbox"></span>
                    Good
                  </label>
                </div>
              </div>
              <div className="parcel-value">
                <p>
                  <b>4. Parcel value content</b>
                </p>
                {/* <TrackingParcelValueTable parcelValues={parcelValues} /> */}
              </div>
              <div className="parcel-service">
                <p>
                  <b>5. Additional / Special services</b>
                </p>
                <p>{additionalService}</p>
                <p style={{ fontSize: "1.2rem" }}>Contact Code: EMSC/PPA</p>
              </div>
            </div>
            <div className="sender-instruction">
              <p>
                <b>6. Sender's instructions for undeliverable parcel</b>
              </p>
              <div className="check-box-group">
                <label className="checkBox">
                  <input
                    type="checkbox"
                    className="input"
                    checked={props.formData.instruction == "1"}
                    disabled
                  />
                  <span className="custom-checkbox"></span>
                  Return immediately
                </label>
                <label className="checkBox">
                  <input
                    type="checkbox"
                    className="input"
                    checked={props.formData.instruction == "2"}
                    disabled
                  />
                  <span className="custom-checkbox"></span>
                  Call sender/Transaction point
                </label>
                <label className="checkBox">
                  <input
                    type="checkbox"
                    className="input"
                    checked={props.formData.instruction == "3"}
                    disabled
                  />
                  <span className="custom-checkbox"></span>
                  Cancel order
                </label>
              </div>
              <div className="check-box-group">
                <label className="checkBox">
                  <input
                    type="checkbox"
                    className="input"
                    checked={props.formData.instruction == "4"}
                    disabled
                  />
                  <span className="custom-checkbox"></span>
                  Return before date
                </label>
                <label className="checkBox">
                  <input
                    type="checkbox"
                    className="input"
                    checked={props.formData.instruction == "5"}
                    disabled
                  />
                  <span className="custom-checkbox"></span>
                  Return when storing time expired
                </label>
              </div>
            </div>
            <div className="section">
              <div className="sender-commiment">
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
              <div className="sender-signature">
                <div className="date">
                  <p>
                    <b>8. Date of Sending</b>
                  </p>
                  <p>paths[0].time.timeArrived</p>
                </div>
                <div className="signature">
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
          <div className="box-4">
            <div className="section">
              <div className="left">
                <div className="delivery-fare">
                  <p>
                    <b>9. Delivery fare:</b>
                  </p>
                  {deliveryFare.map((fare, index) => {
                    return (
                      <div className="fare" key={index}>
                        <p>
                          {fare.index}. {fare.title}
                        </p>
                        <p>{fare.value}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="recipient-fare">
                  <p>
                    <b>11. Recipient's fare:</b>
                  </p>
                  {recipientFare.map((fare, index) => {
                    return (
                      <div className="fare" key={index}>
                        <p>{fare.title}</p>
                        <p>{fare.value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="right">
                <div className="parcel-weight">
                  <p>
                    <b>10. Weight (kg):</b>
                  </p>
                  {weight.map((weight, index) => {
                    return (
                      <div className="weight" key={index}>
                        <p>{weight.title}</p>
                        <p>{weight.value}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="parcel-note">
                  <p>
                    <b>12. Notes</b>
                  </p>
                  <p>{notes}</p>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="parcel-approval">
                <p>
                  <b>13. Post office approval</b>
                </p>
                <p>Receiving clerk's signature</p>
                {/* <img src={approvedImg} alt="post office aproval" width="110px" /> */}
                <p>
                  {/* <i>{paths[0]?.user_name}</i> */}
                </p>
              </div>
              <div className="delivery-date">
                <p>
                  <b>14. Received date</b>
                </p>
                <p>{`${
                  delivered ? false /*paths[3].time*/ ?? "Delivered" : "Not delivered"
                }`}</p>
                <p style={{fontSize: "1.1rem"}}>Recipient's signature</p>
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
                <div className="qr-code">
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
  
  export default ParcelInfo;