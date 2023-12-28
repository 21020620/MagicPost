import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import AccountTable from '../../../../AccountTable';
import axiosInstance from '../../../../DefaultAxios';
import AddCentralEmployeeForm from '../../../../Layout/AddCentralEmployeeForm';

const CentralManagerAccount = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [workplace, setWorkplace] = useState({});

  const fetchData = async () => {
    try {
      const workplaceResponse = await axiosInstance.get('/api/cpoint/cpFromAccount');
      setWorkplace(workplaceResponse.data);
      const response = await axiosInstance.get(`/api/cpoint/employees/${workplaceResponse.data.id}`);
      setData(response.data.map((item) => (item.Employee)));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddButtonClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleAddEmployee = () => {
    formData.role = 'cpointw';
    formData.CEmployee = { create: {cpointId: workplace.id} };
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
        <AddCentralEmployeeForm setFormData={setFormData}/>
      </Modal>
    </div>
  );
};

export default CentralManagerAccount;



