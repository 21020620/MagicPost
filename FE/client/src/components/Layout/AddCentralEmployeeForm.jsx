// Import necessary components from Ant Design
import { Button, Form, Input, Select, DatePicker } from 'antd';
const { Option } = Select;

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

// Define the AddCentralEmployeeForm component
const AddCentralEmployeeForm = ({ setFormData }) => {
  // Create a form instance
  const [form] = Form.useForm();

  // Handle form submission
  const onFinish = (fieldsValue) => {
    // Format date of birth and extract specific fields
    fieldsValue.dob = fieldsValue['dob'].format('YYYY-MM-DD') + 'T19:05:03Z';
    const { prefix, workplace, position, ...rest } = fieldsValue;

    // Set form data using the provided callback
    setFormData(rest);
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

      {/* Form Item for Position (Read-Only) */}
      <Form.Item
        name="position"
        label="Position"
        rules={[
          {
            required: false,
            message: 'Please input your position!',
          },
        ]}
      >
        <Input readOnly />
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

// Export the AddCentralEmployeeForm component
export default AddCentralEmployeeForm;
