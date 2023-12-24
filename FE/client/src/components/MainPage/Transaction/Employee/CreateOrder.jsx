import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Radio,
  Select,
  message,
  Row, Col,
} from 'antd';
import AddOrderForm from './AddOrderForm';

const createOrder = () => {
  const [selectedDropdown, setSelectedDropdown] = useState(null);

  const handleDropdownChange = (value) => {
    setSelectedDropdown(value);
  };

  useEffect(() => {
    
  }, []);

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  const orderOptions = ['Document', 'Good'];
  const instructionOptions = [
    {
      label: 'Return immediately',
      value: 1,
    },
    {
      label: 'Call sender/Transaction point',
      value: 2,
    },
    {
      label: 'Cancel order',
      value: 3,
    },
    {
      label: 'Return before date',
      value: 4,
    },
    {
      label: 'Return when storing time expired',
      value: 5,
    },
  ];


  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Tạo đơn hàng mới</h1>
      
      <Select
        placeholder="Chọn dropdown"
        style={{ width: 200, marginBottom: 16 }}
        onChange={handleDropdownChange}
      >
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
      </Select>

            <Form.Item
                name="senderPhone"
                label="Sender phone number"
                rules={[
                    {
                        required: true,
                        message: 'Please input receiver phone number!',
                    },
                    ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="receiverInfo"
                label="Name, address receiver"
                rules={[
                {
                    required: true,
                    message: 'Please input receiver infomation!',
                },
                ]}
            >
                <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item
                name="receiverPhone"
                label="Receiver phone number"
                rules={[
                    {
                        required: true,
                        message: 'Please input receiver phone number!',
                    },
                    ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="orderType"
                label="Type of order"
                rules={[
                    {
                        required: true,
                        message: 'Please select your type of order!',
                    },
                    ]}
            >
                <Radio.Group 
                style={{ marginLeft: '-230px' }}
                options={orderOptions} onChange={onChange} />
            </Form.Item>

            <Form.Item
                name="instruction"
                label="Instruction (delivery fail)"
            >
                <Radio.Group options={instructionOptions} />
            </Form.Item>

            <Form.Item
                name="mainFee"
                label="Main Fee"
                rules={[
                    {
                        required: false,
                    },
                    ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="subFee"
                label="Sub Fee"
                rules={[
                    {
                        required: false,
                    },
                    ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="transportFee"
                label="Transport Fee"
                rules={[
                    {
                        required: false,
                    },
                    ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="addFee"
                label="Additional Fee"
                rules={[
                    {
                        required: false,
                    },
                    ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="Total Fee (include VAT)"
                label="Tổng cước (gồm VAT)"
                rules={[
                    {
                        required: true,
                        message: 'Please input sender infomation!',
                    },
                    ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="weight"
                label="Weight (kg)"
                rules={[
                    {
                        required: true,
                        message: 'Please input sender infomation!',
                    },
                    ]}
            >
                <Input />
            </Form.Item>

            <Form.Item name="receivePoint">

            <Select style={{ width: '300px', marginLeft: '20px', marginLeft: '30px' }} placeholder="Select central point">
            </Select>
              
            <Select style={{ width: '300px', marginLeft: '20px'}} placeholder="Select transaction point">
            </Select>

            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
        </Form>
    </div>
  );
};

export default createOrder;
