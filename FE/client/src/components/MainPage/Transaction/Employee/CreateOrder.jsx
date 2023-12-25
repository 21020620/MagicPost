import { useState, useEffect } from 'react';
import { Select, Form, Input, Radio, Button, InputNumber } from 'antd';
import AddOrderForm from './AddOrderForm';

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

const CreateOrder = () => {

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
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
      <Form
        {...formItemLayout}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        style={{
          marginLeft: '-100px',
          width: '1000px',
        }}
      >
      <h1 style={{ textAlign: 'center' }}>Tạo đơn hàng mới</h1>
      
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
                <InputNumber min = {0} initialvalues={0} precision={2}/>
            </Form.Item>

            <Form.Item name="centralPoint" label="Central Point">
              <Select style={{ width: '300px', marginLeft: '20px' }} placeholder="Select central point">
              </Select>
            </Form.Item>

            <Form.Item name="transactionPoint" label = "Transaction Point">
              <Select style={{ width: '300px', marginLeft: '20px'}} placeholder="Select transaction point">
              </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
        </Form>
  );
};

export default CreateOrder;
