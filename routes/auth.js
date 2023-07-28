// backend/routes/auth.js

const express = require('express');
const router = express.Router();

// Import the controllers for authentication
const {
  registerManufacturer,
  registerTransporter,
  login,
} = require('../controllers/authController');

// Register routes for user registration and login
router.use('/register/manufacturer', registerManufacturer);
router.post('/register/transporter', registerTransporter);
router.post('/login', login);

module.exports = router;
