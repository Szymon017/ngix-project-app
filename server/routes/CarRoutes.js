// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// CREATE
router.post('/cars', async (req, res) => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ all
router.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ one
router.get('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put('/cars/:id', async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete('/cars/:id', async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    res.json(deletedCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
