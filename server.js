// backend/server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
require('./db');

// Routes
const authRoutes = require('./routes/auth');
const manufacturerRoutes = require('./routes/manufacturer');
const transporterRoutes = require('./routes/transporter');

app.use('/api/auth', authRoutes);
app.use('/api/manufacturer', manufacturerRoutes);
app.use('/api/transporter', transporterRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
