// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ where: { username }});

    if (!user) {
      return res.status(400).json({ message: 'Nieprawidłowe dane logowania' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Nieprawidłowe dane logowania' });
    }

    req.session.user = user; // Ustawienie sesji dla użytkownika
    res.json({ message: 'Pomyślnie zalogowano' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Błąd serwera');
  }
});

module.exports = router;
