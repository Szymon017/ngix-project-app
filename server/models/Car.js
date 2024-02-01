// models/Car.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const { url, options } = require('../config/mongoConfig.js');

mongoose.connect(url, options);

const carSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
