/* import { useEffect, useState } from 'react';
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
export default CEOmanagerAccount; */

import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import AccountTable from '../AccountTable';
import axiosInstance from '../DefaultAxios';
import AddEmployerForm from './AddEmployerForm';

const CEOmanagerAccount = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleAddButtonClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleAddEmployee = () => {
    // Implement the logic to add an employee here
    // After adding, you can refetch data or update the table as needed
    fetchData();
    setIsModalVisible(false);
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16, float: "left" }} onClick={handleAddButtonClick}>
        Add
      </Button>
      <AccountTable data={data} />
      <Modal
        //title="Add Employee"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button key="add" type="primary" onClick={handleAddEmployee}>
            Add
          </Button>,
        ]}
        width={700}
      >
        {/* Display the message "kek" in the modal */}
        <AddEmployerForm/>
      </Modal>
    </div>
  );
};

export default CEOmanagerAccount;

