const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

module.exports = {
  GEMINI_API_URL: process.env.GEMINI_API_URL || 'https://api.gemini.com/v1/process',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};
