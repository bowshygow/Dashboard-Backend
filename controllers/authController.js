// backend/controllers/authController.js

const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const Manufacturer = require('../models/Manufacturer');
const Transporter = require('../models/Transporter');
const secret_key = "Bowshydashboard" 


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
    const token = jwt.sign({ id: manufacturer._id,userType:'manufacturer' }, secret_key);

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
    const token = jwt.sign({ id: transporter._id, userType:'Transporter' }, secret_key);

    res.status(201).json({ message: 'Transporter registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while registering the Transporter' });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Find the user (Manufacturer or Transporter) by username
    const manufacturerUser = await Manufacturer.findOne({ username });
    const transporterUser = await Transporter.findOne({ username });

    let user = null;
    let userType = null;

    // Check if the user exists and determine the userType
    if (manufacturerUser) {
      user = manufacturerUser;
      userType = 'manufacturer';
    } else if (transporterUser) {
      user = transporterUser;
      userType = 'transporter';
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const userRequest = { id: user._id, userType }

    // Generate a JWT token for the user
    const token = jwt.sign(userRequest, secret_key);
    console.log(token);

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
