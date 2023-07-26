// db.js

const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/mern_dashboard'; // Change this URI to your MongoDB database URL

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
