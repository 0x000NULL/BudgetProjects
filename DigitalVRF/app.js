// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const formRoutes = require('./routes/formRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(error => {
    console.error('MongoDB connection error:', error);
});

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/forms', formRoutes);

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve the frontend's entry point for all non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Define the port to run the server
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
