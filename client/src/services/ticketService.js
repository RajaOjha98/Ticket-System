import axios from 'axios';

// Get all tickets
export const getTickets = async () => {
  try {
    const res = await axios.get('/api/tickets');
    return { success: true, data: res.data };
  } catch (err) {
    return { 
      success: false, 
      error: err.response?.data?.message || 'Failed to fetch tickets'
    };
  }
};

// Get ticket by ID
export const getTicketById = async (id) => {
  try {
    const res = await axios.get(`/api/tickets/${id}`);
    return { success: true, data: res.data };
  } catch (err) {
    return { 
      success: false, 
      error: err.response?.data?.message || 'Failed to fetch ticket'
    };
  }
};

// Create new ticket
export const createTicket = async (ticketData) => {
  try {
    // If there's an attachment, use FormData
    if (ticketData.attachment) {
      const formData = new FormData();
      formData.append('title', ticketData.title);
      formData.append('initialNote', ticketData.initialNote);
      if (ticketData.customerId) {
        formData.append('customerId', ticketData.customerId);
      }
      formData.append('attachment', ticketData.attachment);
      
      const res = await axios.post('/api/tickets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return { success: true, data: res.data };
    } else {
      const res = await axios.post('/api/tickets', ticketData);
      return { success: true, data: res.data };
    }
  } catch (err) {
    return { 
      success: false, 
      error: err.response?.data?.message || 'Failed to create ticket'
    };
  }
};

// Update ticket status
export const updateTicketStatus = async (id, status) => {
  try {
    const res = await axios.put(`/api/tickets/${id}/status`, { status });
    return { success: true, data: res.data };
  } catch (err) {
    return { 
      success: false, 
      error: err.response?.data?.message || 'Failed to update ticket status'
    };
  }
};

// Add note to ticket
export const addNoteToTicket = async (id, noteData) => {
  try {
    // If there's an attachment, use FormData
    if (noteData.attachment) {
      const formData = new FormData();
      formData.append('text', noteData.text);
      formData.append('attachment', noteData.attachment);
      
      const res = await axios.post(`/api/tickets/${id}/notes`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return { success: true, data: res.data };
    } else {
      const res = await axios.post(`/api/tickets/${id}/notes`, { text: noteData.text });
      return { success: true, data: res.data };
    }
  } catch (err) {
    return { 
      success: false, 
      error: err.response?.data?.message || 'Failed to add note'
    };
  }
};

// Get ticket statistics (admin only)
export const getTicketStats = async () => {
  try {
    const res = await axios.get('/api/tickets/stats');
    return { success: true, data: res.data };
  } catch (err) {
    return { 
      success: false, 
      error: err.response?.data?.message || 'Failed to fetch ticket statistics'
    };
  }
}; 