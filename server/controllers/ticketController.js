const Ticket = require('../models/Ticket');
const User = require('../models/User');

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private (Customer, Agent, Admin)
exports.createTicket = async (req, res) => {
  try {
    const { title, initialNote } = req.body;
    
    let customerUser;
    
    // If the user is a customer, use their own ID
    if (req.user.role === 'customer') {
      customerUser = req.user._id;
    } 
    // If admin/agent creates ticket for a customer, verify customer exists
    else if (req.body.customerId) {
      const customer = await User.findById(req.body.customerId);
      if (!customer || customer.role !== 'customer') {
        return res.status(400).json({ message: 'Customer not found' });
      }
      customerUser = customer._id;
    } else {
      return res.status(400).json({ message: 'Customer ID is required' });
    }

    // Create new ticket data
    const ticketData = {
      title,
      customer: customerUser,
      notes: initialNote ? [{
        text: initialNote,
        createdBy: req.user._id,
        attachment: req.file ? `/uploads/${req.file.filename}` : null
      }] : []
    };

    // Create the ticket
    const ticket = await Ticket.create(ticketData);

    // Populate customer and note creator info
    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('customer', 'name email')
      .populate('notes.createdBy', 'name role');

    res.status(201).json(populatedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      details: error.errors ? Object.keys(error.errors).map(key => ({ 
        field: key, 
        message: error.errors[key].message 
      })) : null
    });
  }
};

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Private (Agent, Admin)
exports.getTickets = async (req, res) => {
  try {
    let tickets;

    // If customer, return only their tickets
    if (req.user.role === 'customer') {
      tickets = await Ticket.find({ customer: req.user._id })
        .populate('customer', 'name email')
        .sort({ updatedAt: -1 });
    } 
    // If agent or admin, return all tickets
    else {
      tickets = await Ticket.find({})
        .populate('customer', 'name email')
        .sort({ updatedAt: -1 });
    }

    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get ticket by ID
// @route   GET /api/tickets/:id
// @access  Private
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('customer', 'name email')
      .populate('notes.createdBy', 'name role');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if user is authorized to view the ticket
    if (req.user.role === 'customer' && ticket.customer._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this ticket' });
    }

    res.json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update ticket status
// @route   PUT /api/tickets/:id/status
// @access  Private (Agent, Admin)
exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Active', 'Pending', 'Closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    ticket.status = status;
    ticket.updatedAt = Date.now();

    await ticket.save();
    
    // Get the populated ticket to return to the client
    const updatedTicket = await Ticket.findById(req.params.id)
      .populate('customer', 'name email')
      .populate('notes.createdBy', 'name role');
    
    res.json(updatedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add note to ticket
// @route   POST /api/tickets/:id/notes
// @access  Private
exports.addNote = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: 'Note text is required' });
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if customer is authorized to add notes to this ticket
    if (req.user.role === 'customer' && ticket.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to add notes to this ticket' });
    }

    // Create new note
    const newNote = {
      text,
      createdBy: req.user._id,
      attachment: req.file ? `/uploads/${req.file.filename}` : null,
      createdAt: Date.now()
    };

    // Add note to ticket
    ticket.notes.push(newNote);
    ticket.updatedAt = Date.now();

    // Save ticket
    await ticket.save();

    // Get updated ticket with populated fields
    const updatedTicket = await Ticket.findById(req.params.id)
      .populate('customer', 'name email')
      .populate('notes.createdBy', 'name role');

    res.status(201).json(updatedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get ticket statistics
// @route   GET /api/tickets/stats
// @access  Private (Admin)
exports.getTicketStats = async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();
    const activeTickets = await Ticket.countDocuments({ status: 'Active' });
    const pendingTickets = await Ticket.countDocuments({ status: 'Pending' });
    const closedTickets = await Ticket.countDocuments({ status: 'Closed' });
    const totalCustomers = await User.countDocuments({ role: 'customer' });

    res.json({
      totalTickets,
      activeTickets,
      pendingTickets,
      closedTickets,
      totalCustomers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 