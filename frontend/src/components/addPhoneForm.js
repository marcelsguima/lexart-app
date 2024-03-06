import React, { useState } from 'react';
import axios from 'axios';

const AddPhoneForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [phone, setPhone] = useState({
    name: '',
    brand: '',
    model: '',
    price: '',
    color: ''
  });

  const handleAddPhone = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setPhone({ ...phone, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      await axios.post('http://localhost:3001/phones/create', phone, {
        headers: { Authorization: `${token}` }
      });
      setPhone({
        name: '',
        brand: '',
        model: '',
        price: '',
        color: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button onClick={handleAddPhone}>New Phone</button>
      {showForm && (
        <div>
          <h2>Add a new phone</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={phone.name} onChange={handleChange} />
            </label>
            <label>
              Brand:
              <input type="text" name="brand" value={phone.brand} onChange={handleChange} />
            </label>
            <label>
              Model:
              <input type="text" name="model" value={phone.model} onChange={handleChange} />
            </label>
            <label>
              Price:
              <input type="text" name="price" value={phone.price} onChange={handleChange} />
            </label>
            <label>
              Color:
              <input type="text" name="color" value={phone.color} onChange={handleChange} />
            </label>
            <button type="submit">Add Phone</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddPhoneForm;