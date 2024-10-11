const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to allow cross-origin requests and JSON parsing
app.use(cors());
app.use(express.json()); // Enable JSON body parsing

// Import user routes
const userRoutes = require('./routes/userRoutes');

// Use the user routes under the '/api/users' path
app.use('/api/users', userRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the AI-Enhanced Travel Planner!');
});

// Define the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
