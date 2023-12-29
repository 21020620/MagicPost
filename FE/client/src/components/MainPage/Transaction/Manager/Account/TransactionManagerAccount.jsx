import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import AccountTable from '../../../../AccountTable';
import axiosInstance from '../../../../DefaultAxios';
import AddTransactionEmployeeForm from '../../../../Layout/AddTransactionEmployeeForm';

const TransactionManagerAccount = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [workplace, setWorkplace] = useState({});

  const fetchData = async () => {
    try {
      const workplaceResponse = await axiosInstance.get('/api/tpoint/tpFromAccount');
      setWorkplace(workplaceResponse.data);
      const response = await axiosInstance.get(`/api/tpoint/employees/${workplaceResponse.data.id}`);
      setData(response.data.map((item) => (item.Employee)));
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
    formData.role = 'tpointw';
    formData.TEmployee = { create: {tpointId: workplace.id} };
    console.log(formData);
    axiosInstance.post('/api/admin/employees', formData);
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
        open={isModalVisible}
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
        <AddTransactionEmployeeForm setFormData={setFormData}/>
      </Modal>
    </div>
  );
};

export default TransactionManagerAccount;



