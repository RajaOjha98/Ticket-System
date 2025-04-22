const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all tickets (filtered by role)
router.get('/', protect, ticketController.getTickets);

// Get ticket statistics
router.get('/stats', protect, authorize('admin'), ticketController.getTicketStats);

// Get a specific ticket
router.get('/:id', protect, ticketController.getTicketById);

// Create a ticket
router.post('/', protect, upload.single('attachment'), ticketController.createTicket);

// Update ticket status (agent, admin only)
router.put('/:id/status', 
  protect, 
  authorize('agent', 'admin'), 
  ticketController.updateTicketStatus
);

// Add note to ticket
router.post('/:id/notes', 
  protect, 
  upload.single('attachment'), 
  ticketController.addNote
);

module.exports = router; 