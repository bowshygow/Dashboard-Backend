// backend/models/Transporter.js

const mongoose = require('mongoose');

const transporterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // You can include any other fields specific to Transporters
});

const Transporter = mongoose.model('Transporter', transporterSchema);

module.exports = Transporter;
