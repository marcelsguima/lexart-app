import React, { useState } from 'react';

const PhoneTable = ({ phones, editingId, handleEdit, handleSave, handleDelete }) => {
  const [newDetails, setNewDetails] = useState({});

  const handleChange = (id, field, value) => {
    setNewDetails(prevDetails => ({ ...prevDetails, [id]: { ...(prevDetails[id] || {}), [field]: value } }));
  };
  const [filters, setFilters] = useState({ name: '', brand: '', model: '', price: '', color: '' });

  const handleFilterChange = (field, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [field]: value }));
  };

  return (
  <table>
    <thead>
      <tr>
        <th><input placeholder="Name" value={filters.name} onChange={(e) => handleFilterChange('name', e.target.value)} /></th>
        <th><input placeholder="Brand" value={filters.brand} onChange={(e) => handleFilterChange('brand', e.target.value)} /></th>
        <th><input placeholder="Model" value={filters.model} onChange={(e) => handleFilterChange('model', e.target.value)} /></th>
        <th><input placeholder="Price" value={filters.price} onChange={(e) => handleFilterChange('price', e.target.value)} /></th>
        <th><input placeholder="Color" value={filters.color} onChange={(e) => handleFilterChange('color', e.target.value)} /></th>
        <th></th>
        <th></th>
      </tr>
    </thead>
      <tbody>
      {[...phones]
  .filter(phone => Object.entries(filters).every(([key, value]) => phone[key].toString().includes(value)))
  .sort((a, b) => a.price - b.price)
  .map((phone) => (
          <tr key={phone.id}>
            {editingId === phone.id ? (
              <>
                <td><input value={newDetails[phone.id]?.name || phone.name} onChange={(e) => handleChange(phone.id, 'name', e.target.value)} /></td>
                <td><input value={newDetails[phone.id]?.brand || phone.brand} onChange={(e) => handleChange(phone.id, 'brand', e.target.value)} /></td>
                <td><input value={newDetails[phone.id]?.model || phone.model} onChange={(e) => handleChange(phone.id, 'model', e.target.value)} /></td>
                <td><input value={newDetails[phone.id]?.price || phone.price} onChange={(e) => handleChange(phone.id, 'price', e.target.value)} /></td>
                <td><input value={newDetails[phone.id]?.color || phone.color} onChange={(e) => handleChange(phone.id, 'color', e.target.value)} /></td>
                <td><button onClick={() => handleSave(phone.id, newDetails[phone.id])}>Save</button></td>
                 </>
            ) : (
              <>
                <td>{phone.name}</td>
                <td>{phone.brand}</td>
                <td>{phone.model}</td>
                <td>{phone.price}</td>
                <td>{phone.color}</td>
                <td><button onClick={() => handleEdit(phone.id)}>Edit</button></td>
                <td><button onClick={() => handleDelete(phone.id)}>Delete</button></td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PhoneTable;