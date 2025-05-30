const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables
dotenv.config();

// Old admin email to delete
const OLD_ADMIN_EMAIL = "admin@example.com";

// New admin details
const NEW_ADMIN = {
  name: "Admin User",
  email: "admin@gmail.com",
  password: "admin123",
  role: "admin"
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/helpdesk')
  .then(async () => {
    console.log('MongoDB connected');
    
    try {
      // Delete old admin if exists
      const oldAdmin = await User.findOneAndDelete({ email: OLD_ADMIN_EMAIL });
      if (oldAdmin) {
        console.log(`Deleted old admin with email: ${OLD_ADMIN_EMAIL}`);
      } else {
        console.log(`No admin found with email: ${OLD_ADMIN_EMAIL}`);
      }
      
      // Check if new admin email already exists
      const existingNewAdmin = await User.findOne({ email: NEW_ADMIN.email });
      if (existingNewAdmin) {
        console.log(`Admin with email ${NEW_ADMIN.email} already exists`);
      } else {
        // Create the new admin user
        const admin = await User.create(NEW_ADMIN);
        console.log(`New admin created successfully with ID: ${admin._id}`);
        console.log(`Email: ${NEW_ADMIN.email}`);
        console.log(`Password: ${NEW_ADMIN.password}`);
      }
    } catch (error) {
      console.error('Error updating admin:', error);
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