const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables
dotenv.config();

// Agent details - you can modify these
const AGENT = {
  name: "Agent User",
  email: "agent@gmail.com",
  password: "agent123",
  role: "agent"
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/helpdesk')
  .then(async () => {
    console.log('MongoDB connected');
    
    try {
      // Check if agent already exists
      const exists = await User.findOne({ email: AGENT.email });
      
      if (exists) {
        console.log(`Agent with email ${AGENT.email} already exists`);
      } else {
        // Create the agent user
        const agent = await User.create(AGENT);
        console.log(`Agent created successfully with ID: ${agent._id}`);
        console.log(`Email: ${AGENT.email}`);
        console.log(`Password: ${AGENT.password}`);
      }
    } catch (error) {
      console.error('Error creating agent:', error);
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