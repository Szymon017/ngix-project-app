import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LoginForm.css'; // Załóżmy, że istnieje plik stylów LoginForm.css

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('http://localhost:3001/auth/login', {
      username: username,
      password: password
    })
    .then(response => {
      console.log('Pomyślne logowanie:', response.data);
      window.location.href = "http://localhost:3000/home"
    })
    .catch(error => {
      console.error('Błąd logowania:', error.response.data.message);
    });
  };

  return (
    <div className="login-form-container">
      <div className="login-inputs">
        <label>Użytkownik:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Hasło:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Zaloguj się</button>
      <div className="register-link">
        <p>Nie masz konta? <Link to="/register">Zarejestruj się</Link></p>
      </div>
    </div>
  );
}

export default LoginForm;
