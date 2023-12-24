import React, { useState } from 'react';
import { Select } from 'antd';
import AddOrderForm from './AddOrderForm';

const CreateOrder = () => {
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [formData, setFormData] = useState({}); // Move useState inside the component body

  const handleDropdownChange = (value) => {
    setSelectedDropdown(value);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Tạo đơn hàng mới</h1>
      
      <Select
        placeholder="Chọn dropdown"
        style={{ width: 200, marginBottom: 16 }}
        onChange={handleDropdownChange}
      >
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
      </Select>

      {selectedDropdown === 'option1' && <AddOrderForm setFormData={setFormData} />}
    </div>
  );
};

export default CreateOrder;
