// Centralized Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Customize response based on error type
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || 'An unexpected error occurred.',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Stack trace only in development
  });
};

module.exports = errorHandler;
