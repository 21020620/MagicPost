import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  DatePicker, 
  TimePicker,
  message,
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
const createOrder = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    message.success('Thêm đơn hàng thành công');

    // Chờ 3 giây trước khi chuyển hướng
    setTimeout(() => {
      // Chuyển hướng sang trang chủ Google
      navigate('/TE');
    }, 3000);
  };

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  const orderOptions = ['Document', 'Good'];
  const instructionOptions = [
    {
      label: 'Chuyển hàng ngay',
      value: 'Chuyển hàng ngay',
    },
    {
      label: 'Gọi diện cho người gửi/BC gửi',
      value: 'Gọi diện cho người gửi/BC gửi',
    },
    {
      label: 'Hủy',
      value: 'Hủy',
    },
    {
      label: 'Chuyển hoàn trước ngày',
      value: 'Chuyển hoàn trước ngày',
    },
    {
      label: 'Chuyển hoàn khi hết thời gian lưu trữ',
      value: 'Chuyển hoàn khi hết thời gian lưu trữ',
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
                name="name, address sender"
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
                name="sender code"
                label="Sender code"
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="sender postal code"
                label="Sender postal code"
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
                name="name, address receiver"
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
                name="receiver code"
                label="Receiver code"
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="receiver postal code"
                label="Receiver postal code"
                rules={[
                    {
                        required: true,
                        message: 'Please input receiver infomation!',
                    },
                    ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="type of order"
                label="Type of order"
                rules={[
                    {
                        required: true,
                        message: 'Please select your type of order!',
                    },
                    ]}
            >
                <Checkbox.Group 
                style={{ marginLeft: '-230px' }}
                options={orderOptions} onChange={onChange} />
            </Form.Item>

            <Form.Item
                name="instruction"
                label="Instruction"
                
            >
                <Checkbox.Group options={instructionOptions} onChange={onChange} />
            </Form.Item>

            <Form.Item
              name="date"
              label="Date of order"
              rules={[
                {
                  required: true,
                  message: 'Please input Date of order!',
                },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" placeholder="Select Date"/>
            </Form.Item>

            <Form.Item
              name="time"
              label="Time of order"
              rules={[
                {
                  required: true,
                  message: 'Please input Time of order!',
                },
              ]}
            >
              <TimePicker format="HH:mm" placeholder="Select Time"/>
            </Form.Item>


            <Form.Item
                name="cước chính"
                label="cước chính"
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
                name="phụ phí"
                label="phụ phí"
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
                name="cước GTVT"
                label="cước GTVT"
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
                name="Tổng cước (gồm VAT)"
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
                name="Thu khác"
                label="Thu khác"
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
                name="Khối lượng thực tế"
                label="Khối lượng thực tế"
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
                name="Khối lượng quy đổi"
                label="Khối lượng quy đổi"
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
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
        </Form>
    </div>
  );
};
export default createOrder;