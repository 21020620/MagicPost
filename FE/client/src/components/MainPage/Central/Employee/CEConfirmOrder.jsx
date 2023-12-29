import { useState, useEffect } from 'react';
import ConfirmLayout from '../../../Layout/ConfirmLayout';
import axiosInstance from '../../../DefaultAxios';
import { useSelector } from 'react-redux';

const ConfirmOrder = () => {
  const [data, setData] = useState([]);
  const { workplace } = useSelector((state) => state.user);

  const getOrdersForCPoint = async () => {
    const response = await axiosInstance.get(`/api/orders/toCpoint/${workplace.id}`);
    setData(response.data);
  }

  useEffect(() => {
    getOrdersForCPoint();
    console.log(data);
  }, []);

  return (
    <div>
      <ConfirmLayout data={data} />
    </div>
  )
};
export default ConfirmOrder;