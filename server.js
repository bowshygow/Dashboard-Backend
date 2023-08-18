// backend/server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors')
const jwt = require('jsonwebtoken');

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors());

// // Connect to MongoDB
// require('./db');

const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://bowshygowtham:PCO3FO1mJ0H79543@cluster0.ifuynje.mongodb.net/?retryWrites=true&w=majority'; // Change this URI to your MongoDB database URL

mongoose.connect(MONGODB_URI)
.then( ()=>{  
  const authRoutes = require('./routes/auth');
  const manufacturerRoutes = require('./routes/manufacturer');
  const transporterRoutes = require('./routes/transporter');
  app.use('/api/auth', authRoutes);
  app.use('/api/manufacturer',authenticateUser, authorizeRole(['manufacturer','transporter']), manufacturerRoutes);
  app.use('/api/transporter',authenticateUser, authorizeRole(['manufacturer','transporter']), transporterRoutes);}
  // app.use('/api/manufacturer', manufacturerRoutes);
  // app.use('/api/transporter', transporterRoutes);}
).catch(console.error);

// Secret key for JWT (you should use environment variables to store the secret in a real-world app)
const secretKey = 'Bowshydashboard';

// Middleware to authenticate requests and extract user information from the JWT token
const authenticateUser = (req, res, next) => {
  console.log('middleware 1',req.body);

  const token = req.header('Authorization'); // Retrieve the token from the request headers

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    console.log('a');
    const decoded = jwt.verify(token, secretKey);
    console.log('b');
    // Check if decoded contains the necessary user information
    if (!decoded || !decoded.id || !decoded.userType) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    console.log('c');
    req.userRequest = decoded;
    console.log('d');
    next();
  } catch (error) {
    console.log('e');
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};


// Middleware for role-based authorization
const authorizeRole = (allowedRoles) => {

  return (req, res, next) => {

    console.log("middleware m2 RESPONSE");

    const { userType } = req.userRequest;

    if (!allowedRoles.includes(userType)) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }

    next();
  };
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
