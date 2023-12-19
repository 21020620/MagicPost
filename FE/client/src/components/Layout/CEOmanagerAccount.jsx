import { useEffect, useState } from 'react';
import { Button } from 'antd';
import AccountTable from '../AccountTable';
import axiosInstance from '../DefaultAxios';

const CEOmanagerAccount = () => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/api/admin/employees');
      setData(response.data);
    } catch (error) {        
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect triggered.');
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }
  
  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16, float: "left" }}>
        Add
      </Button>
      <AccountTable data={data} />
    </div>
  );
};
export default CEOmanagerAccount;