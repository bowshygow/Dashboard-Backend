// backend/controllers/authController.js

const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const Manufacturer = require('../models/Manufacturer');
const Transporter = require('../models/Transporter');

// Register a new Manufacturer
async function registerManufacturer(req, res) {
  console.log("backend hit for manufacturer");
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingManufacturer = await Manufacturer.findOne({ username });
    if (existingManufacturer) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Manufacturer
    const manufacturer = new Manufacturer({ username, password: hashedPassword });
    await manufacturer.save();

    // Generate a JWT token for the new Manufacturer
    const token = jwt.sign({ id: manufacturer._id }, 'your_secret_key_here');

    res.status(201).json({ message: 'Manufacturer registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while registering the Manufacturer' });
  }
}

// Register a new Transporter
async function registerTransporter(req, res) {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingTransporter = await Transporter.findOne({ username });
    if (existingTransporter) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Transporter
    const transporter = new Transporter({ username, password: hashedPassword });
    await transporter.save();

    // Generate a JWT token for the new Transporter
    const token = jwt.sign({ id: transporter._id }, 'your_secret_key_here');

    res.status(201).json({ message: 'Transporter registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while registering the Transporter' });
  }
}

// Login for both Manufacturer and Transporter
async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Find the user (Manufacturer or Transporter) by username
    const user = await Manufacturer.findOne({ username }) || await Transporter.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user._id }, 'your_secret_key_here');

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while processing the login request' });
  }
}

module.exports = {
  registerManufacturer,
  registerTransporter,
  login,
};
