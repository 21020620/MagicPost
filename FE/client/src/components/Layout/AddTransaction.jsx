// Import necessary components and functions from Ant Design
import { Button, Form, Input, Select } from 'antd';
const { Option } = Select;

// Import Axios instance for making API requests
import axiosInstance from '../DefaultAxios';

// Import useEffect and useState from React
import { useEffect, useState } from 'react';

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

  // State to store central points
  const [cpoints, setCpoints] = useState([]);

  // Extract names from data to check for duplicates
  const names = data.map(item => item.name);

  // Handle form submission
  const onFinish = (fieldsValue) => {
    console.log('Received values of form: ', fieldsValue);

    // Set form data using the provided callback
    setFormData(fieldsValue);
  };

  // Fetch central points from the API
  const fetchCPoints = async () => {
    try {
      const response = await axiosInstance.get('/api/cpoint');
      setCpoints(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // useEffect hook to fetch central points when the component mounts
  useEffect(() => {
    fetchCPoints();
  }, []);

  // JSX element for rendering the form
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
          }
        ]}
      >
        <Input />
      </Form.Item>

      {/* Form Item for Postal Code */}
      <Form.Item
        name="postalCode"
        label="Postal Code"
        rules={[
          {
            required: true,
            message: 'Please input postal code!',
          }
        ]}
      >
        <Input />
      </Form.Item>

      {/* Form Item for Central Point Selection */}
      <Form.Item
        name="parentCPId"
        label="Central Point"
        rules={[
          {
            required: true,
            message: 'Please select your central point!',
          }
        ]}
      >
        <Select placeholder="Select central point">
          {cpoints.map((cpoint, index) => (
            <Option key={cpoint.id} value={cpoint.id}>{cpoint.name} - ({cpoint.address})</Option>
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

// Export the AddCentral component
export default AddCentral;
