// Import React, useState, and useEffect from React
import React, { useState, useEffect } from 'react';

// Import necessary components and functions from Ant Design
import { Button, Form, Input, Select, DatePicker } from 'antd';
const { Option } = Select;

// Import Axios instance for making API requests
import axiosInstance from '../DefaultAxios';

// Layout configurations for form items
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

// Layout configuration for the tail form item
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

// Define the AddEmployerForm component
const AddEmployerForm = ({ setFormData }) => {
  // Create a form instance
  const [form] = Form.useForm();

  // State to store workplace options
  const [workplaces, setWorkplaces] = useState([]);

  // Handle form submission
  const onFinish = (fieldsValue) => {
    // Format date of birth
    fieldsValue.dob = fieldsValue['dob'].format('YYYY-MM-DD') + 'T14:42:07Z';
    
    // Remove the 'prefix' field
    delete fieldsValue.prefix;

    // Determine role and set additional fields based on the role
    if (fieldsValue.role === 'Transaction Manager') {
      fieldsValue.role = 'tpointm';
      fieldsValue.TEmployee = { create: {tpointId: fieldsValue.workplace} };
    } else {
      fieldsValue.role = 'cpointm';
      fieldsValue.CEmployee = { create: {cpointId: fieldsValue.workplace} };
    }

    // Remove the 'workplace' field
    delete fieldsValue.workplace;

    // Set form data using the provided callback
    setFormData(fieldsValue);
  };

  // Fetch workplaces based on the selected role
  const defineWorkplace = async (value) => {
    let tempArr = [];
    if (value === 'Transaction Manager') tempArr = await axiosInstance.get('/api/tpoint/without');
    else tempArr = await axiosInstance.get('/api/cpoint/without');
    setWorkplaces(tempArr.data);
  };

  // JSX element for selecting a prefix for phone number
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

  // Render the form
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
      {/* Form Item for First Name */}
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

      {/* Form Item for Last Name */}
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

      {/* Form Item for Date of Birth */}
      <Form.Item name="dob" label="Date Of Birth">
        <DatePicker />
      </Form.Item>

      {/* Form Item for Address */}
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

      {/* Form Item for Email */}
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not a valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Form Item for Phone Number with Prefix Selector */}
      <Form.Item
        name="phoneNumber"
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

      {/* Form Item for Role Selection */}
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
        <Select placeholder="Select Role" onChange={defineWorkplace}>
          <Option value="Transaction Manager">Transaction Manager</Option>
          <Option value="Central Manager">Central Manager</Option>
        </Select>
      </Form.Item>

      {/* Form Item for Workplace Selection */}
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
            <Option key={workplace.id} value={workplace.id}>{workplace.name} - ({workplace.address})</Option>
          ))}
        </Select>
      </Form.Item>

      {/* Form Item for the submit button */}
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Check
        </Button>
      </Form.Item>
    </Form>
  );
};

// Export the AddEmployerForm component
export default AddEmployerForm;
