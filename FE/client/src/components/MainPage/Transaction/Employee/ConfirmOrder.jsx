import React, { useRef, useState } from 'react';
import ConfirmLayout from '../../../Layout/ConfirmLayout';
const data = [
  {
    key: '1',
    id: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    id: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    id: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    id: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];
const ConfirmOrder = () => {
  return (
    <div>
      <ConfirmLayout data={data} />
    </div>
  )
};
export default ConfirmOrder;