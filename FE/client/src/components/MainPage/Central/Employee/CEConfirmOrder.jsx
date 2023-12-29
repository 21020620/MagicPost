import { useState, useEffect } from 'react';
import ConfirmLayout from '../../../Layout/ConfirmLayout';
import axiosInstance from '../../../DefaultAxios';
import { useSelector } from 'react-redux';

// Component for confirming orders
const ConfirmOrder = () => {
  // State to store the retrieved order data
  const [data, setData] = useState([]);
  
  // Redux selector to get the current workplace from the state
  const { workplace } = useSelector((state) => state.user);

  // Function to fetch orders for the current workplace from the server
  const getOrdersForCPoint = async () => {
    try {
      const response = await axiosInstance.get(`/api/orders/toCpoint/${workplace.id}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  // Effect hook to fetch orders when the component mounts
  useEffect(() => {
    getOrdersForCPoint();
    // Note: The data here may not have been updated immediately after calling getOrdersForCPoint
    console.log(data);
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Render the ConfirmLayout component with the retrieved data
  return (
    <div>
      <ConfirmLayout data={data} />
    </div>
  )
};

// Export the ConfirmOrder component as the default export
export default ConfirmOrder;
