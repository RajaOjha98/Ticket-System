const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables
dotenv.config();

// Admin details - you can modify these
const ADMIN = {
  name: "Admin User",
  email: "admin@example.com",
  password: "admin123",
  role: "admin"
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/helpdesk')
  .then(async () => {
    console.log('MongoDB connected');
    
    try {
      // Check if admin already exists
      const exists = await User.findOne({ email: ADMIN.email });
      
      if (exists) {
        console.log(`Admin with email ${ADMIN.email} already exists`);
      } else {
        // Create the admin user
        const admin = await User.create(ADMIN);
        console.log(`Admin created successfully with ID: ${admin._id}`);
        console.log(`Email: ${ADMIN.email}`);
        console.log(`Password: ${ADMIN.password}`);
      }
    } catch (error) {
      console.error('Error creating admin:', error);
    }
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); 