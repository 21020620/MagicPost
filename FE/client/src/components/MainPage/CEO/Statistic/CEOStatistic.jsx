import { useState, useEffect } from 'react';
import { theme } from 'antd';
import StatisticTable from '../../../StatisticTable';
import axiosInstance from '../../../DefaultAxios';

  
const CEOStatistic = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      console.log('dec');
      const response = await axiosInstance.get(`api/orders/orders`);
      setData(response.data);
    } catch (error) {        
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    console.log('useEffect triggered.');
    fetchData();
  }, []);

  return (
    <div>
      <StatisticTable data={data}/>
    </div>
  );
};
export default CEOStatistic;