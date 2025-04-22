const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attachment: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const TicketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Closed'],
    default: 'Active'
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: [NoteSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updatedAt' field whenever a ticket is modified
TicketSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Auto-generate ticket ID (e.g., TKT-001, TKT-002)
TicketSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const count = await mongoose.model('Ticket').countDocuments();
      this.ticketId = `TKT-${String(count + 1).padStart(3, '0')}`;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model('Ticket', TicketSchema); 