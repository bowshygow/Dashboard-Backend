// backend/models/Manufacturer.js

const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // You can include any other fields specific to Manufacturers
});

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

module.exports = Manufacturer;
