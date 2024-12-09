const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
};
