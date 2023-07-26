// backend/routes/manufacturer.js

const express = require('express');
const router = express.Router();

// Import the controllers for manufacturer-specific functionalities
const {
  createManufacturerOrder,
  getManufacturerOrders,
} = require('../controllers/manufacturerController');

// Routes for manufacturer-specific functionalities
router.post('/order', createManufacturerOrder);
router.get('/orders', getManufacturerOrders);

module.exports = router;
