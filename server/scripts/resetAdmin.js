const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables
dotenv.config();

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
      // Delete ALL admin users
      const deletedAdmins = await User.deleteMany({ role: 'admin' });
      console.log(`Deleted ${deletedAdmins.deletedCount} admin user(s)`);
      
      // Create the new admin user
      const admin = await User.create(NEW_ADMIN);
      console.log(`New admin created successfully with ID: ${admin._id}`);
      console.log(`Email: ${NEW_ADMIN.email}`);
      console.log(`Password: ${NEW_ADMIN.password}`);
      console.log('Admin role:', admin.role);
      
    } catch (error) {
      console.error('Error resetting admin:', error);
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