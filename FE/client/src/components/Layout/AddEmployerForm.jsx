import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, DatePicker } from 'antd';
const { Option } = Select;

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
  const [workplaceToRole, setWorkplaceToRole] = useState({});
  
  useEffect(() => {
    // Define the mapping of workplaces to roles
    const workplaceToRoleMapping = {
      'Transaction Point': 'Transaction Manager',
      'Central Point': 'Central Manager',
    };
    setWorkplaceToRole(workplaceToRoleMapping);
  }, []);

  const onFinish = (fieldsValue) => {
    const dateValues = fieldsValue['date-picker'].format('YYYY-MM-DD');
    setFormData(fieldsValue);
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

  const handleRoleChange = (value) => {
    // Set the value of the "Workplace" field based on the selected role
    const roleToWorkplace = Object.entries(workplaceToRole).find(([key, val]) => val === value);
    if (roleToWorkplace) {
      form.setFieldsValue({
        workplace: roleToWorkplace[0],
      });
    }
  };

  const handleWorkplaceChange = (value) => {
    // Set the value of the "Role" field based on the selected workplace
    const role = workplaceToRole[value];
    if (role) {
      form.setFieldsValue({
        role,
      });
    }
  };

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
        <Select placeholder="Select your role" onChange={handleRoleChange}>
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
        <Select placeholder="Select your workplace" onChange={handleWorkplaceChange}>
          <Option value="Transaction Point">Transaction Point</Option>
          <Option value="Central Point">Central Point</Option>
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