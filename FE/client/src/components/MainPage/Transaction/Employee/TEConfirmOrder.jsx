import { useEffect, useState } from 'react';
import ConfirmLayout from '../../../Layout/ConfirmLayout';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../DefaultAxios';

const ConfirmOrder = () => {
  const[data, setData] = useState([]);
  const { user, workplace } = useSelector((state) => state.user);

  const getAllOrders = async () => {
    try {
      console.log(workplace.id)
      const response = await axiosInstance.get(`/api/orders/toTpoint/${workplace.id}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
    console.log(data);
  }, []);

  return (
    <div>
      <ConfirmLayout data={data} />
    </div>
  )
};
export default ConfirmOrder;