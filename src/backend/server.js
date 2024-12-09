const app = require('./app'); // Import the main app
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // Exit the process with failure
  }
};

// Server Configuration
const PORT = process.env.PORT || 5000;

// Start the Server
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err.message);
  }
};

startServer(); // Call the function to start the server
