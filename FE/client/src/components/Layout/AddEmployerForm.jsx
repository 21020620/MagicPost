import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, DatePicker } from 'antd';
const { Option } = Select;
import axiosInstance from '../DefaultAxios';

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

const AddEmployerForm = ({ setFormData }) => {
  const [form] = Form.useForm();
  const [workplaces, setWorkplaces] = useState([]);

  useEffect(() => {
    // Set default value for "Role" when the form is initially rendered
    form.setFieldsValue({
      username: 'email',
      password: '123456',
    });
  }, []);

  const onFinish = (fieldsValue) => {
    const dateValues = fieldsValue['date-picker'].format('YYYY-MM-DD');
    setFormData(fieldsValue);
  };

  const defineWorplace = async (value) => {
    let tempArr = [];
    if (value === 'Transaction Manager') tempArr = await axiosInstance.get('/api/tpoint/without');
    else tempArr = await axiosInstance.get('/api/cpoint/without');
    const names = tempArr.data.map((item) => item.name);
    setWorkplaces(names);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="add"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input readOnly />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input readOnly />
      </Form.Item>

      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: 'Please input your first name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: 'Please input your last name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="date-picker" label="Date Of Birth">
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: true,
            message: 'Please select your address!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="role"
        label="Role"
        rules={[
          {
            required: true,
            message: 'Please select your role!',
          },
        ]}
      >
        <Select placeholder="Select Role" onChange={defineWorplace}>
          <Option value="Transaction Manager">Transaction Manager</Option>
          <Option value="Central Manager">Central Manager</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="workplace"
        label="Workplace"
        rules={[
          {
            required: true,
            message: 'Please select your workplace!',
          },
        ]}
      >
        <Select placeholder="Select Workplace">
          {workplaces.map((workplace) => (
            <Option key={workplace} value={workplace}>{workplace}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Check
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddEmployerForm;
