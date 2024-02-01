const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')
// CREATE
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  try {
    // Sprawdź, czy użytkownik już istnieje
    let existingUser = await User.findOne({ where: {username}});
    console.log(existingUser);

    if (existingUser) {
      return res.status(400).json({ message: 'Użytkownik o podanej nazwie już istnieje' });
    }

    // Haszuj hasło przed zapisaniem do bazy danych
    const hashedPassword = await bcrypt.hash(password, 10);

    // Stwórz nowego użytkownika
    const newUser = new User({
      username: username,
      password: hashedPassword,
    });

    // Zapisz użytkownika w bazie danych
    await newUser.save();

    res.json({ message: 'Pomyślnie zarejestrowano użytkownika' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Błąd serwera');
  }
});

// READ all
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ one
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: { id: req.params.id },
    });
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
