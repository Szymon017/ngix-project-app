import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css'; // Załóżmy, że istnieje plik stylów Register.css

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        axios.post('http://localhost:3001/sql/register', {
            username: username,
            password: password
        })
            .then(response => {
                console.log('Pomyślne zarejestrowanie:', response.data);
                window.location.href = "http://localhost:3000/login"
            })
            .catch(error => {
                console.error('Błąd rejestracji:', error.response.data.message);
            });
    };

    return (
        <div className="register-form-container">
            <div className="register-inputs">
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
            <button onClick={handleRegister}>Zarejestruj się</button>
            <div className="login-link">
                <p>Masz już konto? <Link to="/login">Zaloguj się</Link></p>
            </div>
        </div>
    );
}

export default Register;
