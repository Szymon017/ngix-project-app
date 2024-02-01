// server.js
const express = require('express');
const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
const carRoutes = require('./routes/CarRoutes.js');
const userRoutes = require('./routes/UserRoutes.js');
const cors = require('cors'); // Dodaj tę linijkę
const sessionMiddleware = require('./middleware/sessionMiddleware.js')
const app = express();
const port = process.env.PORT || 3001;
const authRoutes = require('./routes/authRoutes.js')
const protectedRoutes = require('./routes/protectedRoutes.js')
// MySQL
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

app.use(cors());
app.use(sessionMiddleware); // Dodaj middleware sesji

// Dodaj middleware do obsługi JSON
app.use(express.json());

// Dodaj ścieżki do routingów
app.use('/mongo', carRoutes);
app.use('/sql', userRoutes);
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

// Dodaj ścieżki testowe
app.get('/', (req, res) => {
  res.send('Witaj na stronie głównej!');
});

// Uruchom serwer na określonym porcie
app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
