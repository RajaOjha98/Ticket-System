const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables
dotenv.config();

// New agent details
const UPDATED_AGENT = {
  name: "Agent User",
  email: "agent@gmail.com",
  password: "agent123"
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/helpdesk')
  .then(async () => {
    console.log('MongoDB connected');
    
    try {
      // Look for an existing agent user by role
      const existingAgent = await User.findOne({ role: 'agent' });
      
      if (!existingAgent) {
        console.log('No agent user found. Creating a new one...');
        
        // Create new agent
        const newAgent = await User.create({
          ...UPDATED_AGENT,
          role: 'agent'
        });
        
        console.log(`Agent created successfully with ID: ${newAgent._id}`);
        console.log(`Name: ${newAgent.name}`);
        console.log(`Email: ${newAgent.email}`);
        console.log(`Password: ${UPDATED_AGENT.password} (unhashed)`);
      } else {
        console.log(`Found existing agent with ID: ${existingAgent._id}`);
        
        // Update agent details
        existingAgent.name = UPDATED_AGENT.name;
        existingAgent.email = UPDATED_AGENT.email;
        existingAgent.password = UPDATED_AGENT.password; // This will be hashed by the pre-save hook
        
        await existingAgent.save();
        
        console.log('Agent updated successfully');
        console.log(`New Name: ${existingAgent.name}`);
        console.log(`New Email: ${existingAgent.email}`);
        console.log(`New Password: ${UPDATED_AGENT.password} (unhashed)`);
      }
    } catch (error) {
      console.error('Error updating agent:', error);
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