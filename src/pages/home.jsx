import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPhoneForm from '../components/addPhoneForm';
import PhoneTable from '../components/phoneTable';

const Home = () => {
  const [phones, setPhones] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPhones();
  }, []);

  const fetchPhones = async () => {
    try {
      const token = sessionStorage.getItem('token');
      console.log('Home Token:', token);
      const response = await axios.get('http://localhost:3001/phones/getAll', {
        headers: {
          Authorization: `${token}`
        }
      });
      setPhones(response.data);
    } catch (error) {
      console.error('Error fetching phones:', error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = async (id, newDetails) => {
    console.log('Saving phone:', id, newDetails);
    try {
      const token = sessionStorage.getItem('token');
      await axios.patch(`http://localhost:3001/phones/update/${id}`, newDetails, {
        headers: {
          Authorization: `${token}`
        }
      });
      await fetchPhones();
      setEditingId(null);
    } catch (error) {
      console.error('Error updating phone:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`http://localhost:3001/phones/delete/${id}`, {
        headers: {
          Authorization: `${token}`
        }
      });
      await fetchPhones();
    } catch (error) {
      console.error('Error deleting phone:', error);
    }
  };
  return (
    <div>
      <h1>Lexart Phone Lab</h1>
      <AddPhoneForm refreshPhones={fetchPhones} />
      <PhoneTable phones={phones} editingId={editingId} handleEdit={handleEdit} handleSave={handleSave} handleDelete={handleDelete} />
    </div>
  );
};

export default Home;