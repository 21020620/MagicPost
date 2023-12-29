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

const AddCentral = ({ setFormData, data }) => {
  const [form] = Form.useForm();
  const names = data.map(item => item.name);
  const onFinish = (fieldsValue) => {
    console.log('Received values of form: ', fieldsValue);
    setFormData(fieldsValue);
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

      <Form.Item
        name="centralPoint"
        label="Central Point"
        rules={[
          {
            required: true,
            message: 'Please select your central point!',
          }
        ]}
      >
        <Select placeholder="Select central point">
          
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

export default AddCentral;
