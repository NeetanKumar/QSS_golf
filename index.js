const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import your route files from the router folder
const coachRoutes = require('./router/coachRoutes');
const userRoutes = require('./router/userRoutes');
const courseRoutes = require('./router/courseRoutes');
const lectureRoutes = require('./router/lectureRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, this is the homepage!');
});

// Routes   
app.use('/api/coaches', coachRoutes); // Coaches route
app.use('/api/users', userRoutes); // Users route
app.use('/api/courses', courseRoutes); // Courses route
app.use('/api/lectures', lectureRoutes); // Lectures route

// Start the server
const PORT = process.env.PORT || 5008;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
