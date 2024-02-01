// src/components/CarsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarsList.css';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [editedCar, setEditedCar] = useState(null);
  const [newCar, setNewCar] = useState({ brand: '', model: '', year: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    axios.get('http://localhost:3001/mongo/cars')
      .then(response => setCars(response.data))
      .catch(error => console.error('Error fetching cars:', error));
  };

  const handleDelete = (carId) => {
    axios.delete(`http://localhost:3001/mongo/cars/${carId}`)
      .then(() => {
        fetchCars(); // Odśwież listę po usunięciu
      })
      .catch(error => console.error('Error deleting car:', error));
  };

  const handleEdit = (car) => {
    setEditedCar(car);
  };

  const handleUpdate = (carId, updatedCarData) => {
    axios.put(`http://localhost:3001/mongo/cars/${carId}`, updatedCarData)
      .then(() => {
        setEditedCar(null);
        fetchCars(); // Odśwież listę po edycji
      })
      .catch(error => console.error('Error updating car:', error));
  };

  const handleAddCar = () => {
    axios.post('http://localhost:3001/mongo/cars', newCar)
      .then(() => {
        setNewCar({ brand: '', model: '', year: '' }); // Wyczyść pola po dodaniu
        fetchCars(); // Odśwież listę po dodaniu
        setShowAddForm(false); // Schowaj formularz po dodaniu
      })
      .catch(error => console.error('Error adding car:', error));
  };

  return (
    <div className="cars-container">
      <h2>Lista Samochodów</h2>
      <button onClick={() => setShowAddForm(true)}>Dodaj nowy samochód</button>
      <ul>
        {cars.map(car => (
          <li key={car._id} className="car-item">
            {editedCar && editedCar._id === car._id ? (
              <div>
                <input
                  type="text"
                  value={editedCar.brand}
                  onChange={(e) => setEditedCar({ ...editedCar, brand: e.target.value })}
                  placeholder="Marka"
                />
                <input
                  type="text"
                  value={editedCar.model}
                  onChange={(e) => setEditedCar({ ...editedCar, model: e.target.value })}
                  placeholder="Model"
                />
                <input
                  type="text"
                  value={editedCar.year}
                  onChange={(e) => setEditedCar({ ...editedCar, year: e.target.value })}
                  placeholder="Rok produkcji"
                />
                <button onClick={() => handleUpdate(editedCar._id, { brand: editedCar.brand, model: editedCar.model, year: editedCar.year })}>Zapisz</button>
              </div>
            ) : (
              <div>
                {car.brand} {car.model} ({car.year})
                <button onClick={() => handleDelete(car._id)}>Usuń</button>
                <button onClick={() => handleEdit(car)}>Edytuj</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {showAddForm && (
        <div className="add-form">
          <input
            type="text"
            placeholder="Marka"
            value={newCar.brand}
            onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
          />
          <input
            type="text"
            placeholder="Model"
            value={newCar.model}
            onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
          />
          <input
            type="text"
            placeholder="Rok produkcji"
            value={newCar.year}
            onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
          />
          <div>
            <button onClick={handleAddCar}>Dodaj</button>
            <button onClick={() => setShowAddForm(false)}>Anuluj</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarsList;
