// backend/server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors')

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors());

// // Connect to MongoDB
// require('./db');

const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://bowshygowtham:PCO3FO1mJ0H79543@cluster0.ifuynje.mongodb.net/?retryWrites=true&w=majority'; // Change this URI to your MongoDB database URL
mongoose.connect(MONGODB_URI).then( ()=>{  const authRoutes = require('./routes/auth');
const manufacturerRoutes = require('./routes/manufacturer');
const transporterRoutes = require('./routes/transporter');
app.use('/api/auth', authRoutes);
app.use('/api/manufacturer', manufacturerRoutes);
app.use('/api/transporter', transporterRoutes)}
).catch(console.error);

// Routes
// const authRoutes = require('./routes/auth');
// const manufacturerRoutes = require('./routes/manufacturer');
// const transporterRoutes = require('./routes/transporter');

// app.use('/api/auth', authRoutes);
// app.use('/api/manufacturer', manufacturerRoutes);
// app.use('/api/transporter', transporterRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
