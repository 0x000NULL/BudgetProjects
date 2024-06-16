const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const claimRoutes = require('./routes/claimRoutes');
const emailTemplateRoutes = require('./routes/emailTemplateRoutes');

dotenv.config();

const app = express();

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

// API routes
app.use('/api/users', userRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/email-templates', emailTemplateRoutes);

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve the frontend's entry point for all non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
