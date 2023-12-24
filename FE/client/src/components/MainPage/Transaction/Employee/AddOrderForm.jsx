import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  Radio,
  Select,
  message,
  Row, Col,
} from 'antd';
import { useNavigate } from 'react-router-dom';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const AddOrderForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    message.success('Thêm đơn hàng thành công');

    setTimeout(() => {
      navigate('/TE');
    }, 3000);
  };

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
    <div className="flex items-center justify-center h-screen">
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            style={{
                maxWidth: 1000,
                width: '100%',
                marginLeft: '0px',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="senderInfo"
                label="Name, address sender"
                rules={[
                {
                    required: true,
                    message: 'Please input sender infomation!',
                },
                ]}
            >
                <Input.TextArea showCount maxLength={100} />
            </Form.Item>

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

            <Form.Item {...tailFormItemLayout}>
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <Form.Item>
                    <Select style={{ width: '100%' }} placeholder="Select transaction point">
                      {/* Nội dung của Select */}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Register
                    </Button>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item>
                    <Select style={{ width: '100%' }} placeholder="Select central point">
                      {/* Nội dung của Select */}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
        </Form>
    </div>
  );
};
export default AddOrderForm;