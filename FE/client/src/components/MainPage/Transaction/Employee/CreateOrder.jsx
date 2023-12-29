import { useState, useEffect } from 'react';
import { Select, Form, Input, Radio, Button, InputNumber, Modal, message } from 'antd';
import ParcelInfo from './ParcelInfo';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../DefaultAxios';

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [cpoints, setCpoints] = useState([]);
  const [tpoints, setTpoints] = useState([]);
  const [form] = Form.useForm();
  const { user, workplace } = useSelector((state) => state.user);

  const showModal = async () => {
    try {
      await onFinish(form.getFieldsValue());
      // Kiểm tra hợp lệ của form trước khi mở modal
      await form.validateFields();
      setIsModalVisible(true);
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAccept = async () => {
    setIsModalVisible(false);
  };

  const fetchCpoints = async () => {
    try {
      const response = await axiosInstance.get('/api/cpoint');
      setCpoints(response.data);
    } catch (error) {
      console.error('Failed to fetch central points:', error);
    }
  };

  const updateTpoints = async (cpointId) => {
    try {
      const response = await axiosInstance.get(`/api/cpoint/tpoints/${cpointId}`);
      setTpoints(response.data);
    } catch (error) {
      console.error('Failed to fetch transaction points:', error);
    }
  };

  useEffect(() => {
    fetchCpoints();
  }, []);


  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  const onFinish = async (values) => {
    
  };

  const processOrder = async () => {
    const values = await form.getFieldValue();
    const sender = {
      fullName: values.senderInfo.split('\n')[0],
      address: values.senderInfo.split('\n')[1],
      phoneNumber: values.senderPhone,
    }
    const receiver = {
      fullName: values.receiverInfo.split('\n')[0],
      address: values.receiverInfo.split('\n')[1],
      phoneNumber: values.receiverPhone,
    }
    const mainFee = values.mainFee || '0';
    const subFee = values.subFee || '0';
    const transportFee = values.transportFee || '0';
    const addFee = values.addFee || '0';
    const totalFee = values.totalFee || '0';
    let fee = `${mainFee} + ${subFee} + ${transportFee} + ${addFee} = ${totalFee}`;
    console.log('Workplace: ', workplace);
    const order = {
      orderStatus: 'CREATED',
      itemType: values.orderType,
      cannotSend: values.instruction,
      senderTPId: workplace.id,
      receiverTPId: values.transactionPoint,
      fee,
      weight: values.weight,
      deliverNote: values.note ? values.note : '',
      feeReceived: values.feeReceived,
    }
    const response = await axiosInstance.post('/api/orders', {sender, receiver, order, user});
    console.log('Response: ', response.data);
    setFormData(response.data);
    message.success('Order processed successfully');
  };

  const orderOptions = [{ label: 'Document', value: true }, { label: 'Goods', value: false}];
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
        form={form}
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
                name="note"
                label="Note"
            >
                <Input.TextArea showCount maxLength={100} />
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
                name="totalFee"
                label="Total Fee (include VAT)"
                rules={[
                    {
                        required: true,
                        message: 'Please input sender infomation!',
                    },
                    ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="feeReceived"
                label="Received payment"
                rules={[
                    {
                        required: true,
                        message: 'Please input sender infomation!',
                    },
                    ]}
            >
                <Input/>
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
              <Select style={{ width: '300px', marginLeft: '20px' }} placeholder="Select central point" onChange={updateTpoints}>
                {cpoints.map((cpoint) => (
                  <Select.Option key={cpoint.id} value={cpoint.id}>
                    {cpoint.name} - ({cpoint.address})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="transactionPoint" label = "Transaction Point">
              <Select style={{ width: '300px', marginLeft: '20px'}} placeholder="Select transaction point">
                {tpoints.map((tpoint) => (
                  <Select.Option key={tpoint.id} value={tpoint.id}>
                    {tpoint.name} - ({tpoint.address})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" onClick={processOrder} style={{ marginRight: '20px'}}>
                Process
              </Button>
              <Button type="primary" htmlType="submit" onClick={showModal}>
                Create
              </Button>
            </Form.Item>

            <Modal
              open={isModalVisible}
              onCancel={handleCancel}
              width="80%"
              footer={[
                <Button key="cancel" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key="accept" type="primary" onClick={handleAccept}>
                  Accept
                </Button>,
              ]}
              style={{minWidth: '800px'}}
            >
              {formData && <ParcelInfo formData={formData}/>}
            </Modal>
        </Form>
  );
};

export default CreateOrder;
