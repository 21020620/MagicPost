import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import AccountTable from '../../../../AccountTable';
import axiosInstance from '../../../../DefaultAxios';
import AddCentralEmployeeForm from '../../../../Layout/AddCentralEmployeeForm';

// Component for managing central manager accounts
const CentralManagerAccount = () => {
  // State variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [workplace, setWorkplace] = useState({});

  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      // Fetch workplace information
      const workplaceResponse = await axiosInstance.get('/api/cpoint/cpFromAccount');
      setWorkplace(workplaceResponse.data);

      // Fetch employee data for the current workplace
      const response = await axiosInstance.get(`/api/cpoint/employees/${workplaceResponse.data.id}`);
      setData(response.data.map((item) => item.Employee));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Effect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Event handler for the "Add" button click
  const handleAddButtonClick = () => {
    setIsModalVisible(true);
  };

  // Event handler for closing the modal
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // Event handler for adding a new employee
  const handleAddEmployee = () => {
    // Set the role and associate the employee with the current cpoint
    formData.role = 'cpointw';
    formData.CEmployee = { create: { cpointId: workplace.id } };
    console.log(formData);
    
    // Send a POST request to add the employee
    axiosInstance.post('/api/admin/employees', formData);
    
    // Close the modal after adding an employee
    setIsModalVisible(false);
  };

  // Loading state check
  if (loading) {
    return <p>Loading data...</p>;
  }

  // Render the component
  return (
    <div>
      {/* "Add" button */}
      <Button type="primary" style={{ marginBottom: 16, float: 'left' }} onClick={handleAddButtonClick}>
        Add
      </Button>

      {/* Display employee accounts */}
      <AccountTable data={data} />

      {/* Modal for adding a central employee */}
      <Modal
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
        {/* Form for adding a central employee */}
        <AddCentralEmployeeForm setFormData={setFormData} />
      </Modal>
    </div>
  );
};

// Export the CentralManagerAccount component as the default export
export default CentralManagerAccount;
