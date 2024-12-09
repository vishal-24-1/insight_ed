const express = require('express');
const cors = require('cors');
const uploadRoutes = require('./routes/uploadRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/upload', uploadRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
