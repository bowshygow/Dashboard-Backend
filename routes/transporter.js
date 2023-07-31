// backend/routes/transporter.js

const express = require('express');
const router = express.Router();

// Import the controllers for transporter-specific functionalities
const {
  acceptOrder,
  getTransporterOrders,
  getAllTransporters,
  replyToManufacturer
} = require('../controllers/transporterController');

// Routes for transporter-specific functionalities
router.post('/acceptOrder', acceptOrder);
router.post('/orders', getTransporterOrders);
router.get('/all', getAllTransporters );
router.post('/reply', replyToManufacturer );

module.exports = router;
