// Import necessary components from Ant Design
import { Button, Form, Input } from 'antd';
//const { Option } = Select;

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

// Define the AddCentral component
const AddCentral = ({ setFormData, data }) => {
  // Create a form instance
  const [form] = Form.useForm();

  // Extract names from data to check for duplicates
  const names = data.map(item => item.name);

  // Handle form submission
  const onFinish = (fieldsValue) => {
    console.log('Received values of form: ', fieldsValue);

    // Set form data using the provided callback
    setFormData(fieldsValue);
  };

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
      {/* Form Item for Address */}
      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: true,
            message: 'Please input address!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Form Item for Name */}
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input the name!',
          },
          // Custom validation for checking duplicate names
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || !names.includes(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('This name already exists!'));
            },
          }),
        ]}
      >
        <Input />
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

// Export the AddCentral component
export default AddCentral;
