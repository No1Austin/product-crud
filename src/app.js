const express = require('express');

const nosqlRoutes = require('./routes/nosqlRoutes');
const sqlRoutes = require('./routes/sqlRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/mongo', nosqlRoutes);
app.use('/api/mysql', sqlRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found'
  });
});

module.exports = app;