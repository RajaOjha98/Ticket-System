const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/helpdesk')
  .then(async () => {
    console.log('MongoDB connected');
    
    try {
      // Get all users
      const users = await User.find({}).select('name email role createdAt');
      
      console.log('\n=== ALL USERS IN DATABASE ===');
      console.log(`Total users: ${users.length}\n`);
      
      if (users.length === 0) {
        console.log('No users found in database.');
      } else {
        users.forEach((user, index) => {
          console.log(`${index + 1}. ${user.name}`);
          console.log(`   Email: ${user.email}`);
          console.log(`   Role: ${user.role}`);
          console.log(`   Created: ${user.createdAt.toLocaleDateString()}`);
          console.log('   ---');
        });
        
        console.log('\n=== KNOWN PASSWORDS (from scripts) ===');
        console.log('Admin (admin@gmail.com): admin123');
        console.log('Agent (agent@gmail.com): agent123');
        console.log('\nNote: Customer passwords are set during registration');
      }
      
    } catch (error) {
      console.error('Error listing users:', error);
    }
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('\nMongoDB disconnected');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); 