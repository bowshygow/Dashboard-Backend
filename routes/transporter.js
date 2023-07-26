// backend/routes/transporter.js

const express = require('express');
const router = express.Router();

// Import the controllers for transporter-specific functionalities
const {
  acceptOrder,
  getTransporterOrders,
} = require('../controllers/transporterController');

// Routes for transporter-specific functionalities
router.post('/acceptOrder', acceptOrder);
router.get('/orders', getTransporterOrders);

module.exports = router;
