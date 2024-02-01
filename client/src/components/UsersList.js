// src/components/UsersList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UsersList.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:3001/sql/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  };

  const handleDelete = (userId) => {
    axios.delete(`http://localhost:3001/sql/users/${userId}`)
      .then(() => {
        fetchUsers(); // Odśwież listę po usunięciu
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleEdit = (user) => {
    setEditedUser(user);
  };

  const handleUpdate = (userId, updatedUserData) => {
    axios.put(`http://localhost:3001/sql/users/${userId}`, updatedUserData)
      .then(() => {
        setEditedUser(null);
        fetchUsers(); // Odśwież listę po edycji
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div className="users-container">
      <h2>Lista Użytkowników</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className="user-item">
            {editedUser && editedUser.id === user.id ? (
              <div>
                <input
                  type="text"
                  value={editedUser.username}
                  onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                />
                <button onClick={() => handleUpdate(editedUser.id, { username: editedUser.username })}>Zapisz</button>
              </div>
            ) : (
              <div>
                {user.username}
                <button onClick={() => handleDelete(user.id)}>Usuń</button>
                <button onClick={() => handleEdit(user)}>Edytuj</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
