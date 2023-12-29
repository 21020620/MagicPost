import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import AccountTable from '../../../AccountTable';
import axiosInstance from '../../../DefaultAxios';
import AddEmployerForm from '../../../Layout/AddEmployerForm';

// CEOmanagerAccount component definition
const CEOmanagerAccount = () => {
  // State to store the fetched data
  const [data, setData] = useState([]);

  // State to manage loading state
  const [loading, setLoading] = useState(true);

  // State to manage the visibility of the modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State to store form data for adding an employee
  const [formData, setFormData] = useState({});

  // Function to fetch data from the API
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

  // useEffect hook to trigger data fetching on component mount
  useEffect(() => {
    console.log('useEffect triggered.');
    fetchData();
  }, []);

  // Function to handle the click event of the "Add" button
  const handleAddButtonClick = () => {
    setIsModalVisible(true);
  };

  // Function to handle closing the modal
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // Function to handle adding an employee
  const handleAddEmployee = async () => {
    console.log(formData);
    await axiosInstance.post('/api/admin/employees', formData);
    setIsModalVisible(false);
  };

  // If data is still loading, display a loading message
  if (loading) {
    return <p>Loading data...</p>;
  }

  // Return the component JSX
  return (
    <div>
      {/* Button to trigger the "Add" modal */}
      <Button type="primary" style={{ marginBottom: 16, float: "left" }} onClick={handleAddButtonClick}>
        Add
      </Button>

      {/* Display the AccountTable with the fetched data */}
      <AccountTable data={data} />

      {/* Modal for adding a new employee */}
      <Modal
        //title="Add Employee"
        visible={isModalVisible} // Corrected the prop name
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button key="add" type="primary" onClick={handleAddEmployee}>
            Add
          </Button>
        ]}
        width={700}
      >
        {/* AddEmployerForm component to input employee details */}
        <AddEmployerForm setFormData={setFormData}/>
      </Modal>
    </div>
  );
};

// Export the CEOmanagerAccount component
export default CEOmanagerAccount;
