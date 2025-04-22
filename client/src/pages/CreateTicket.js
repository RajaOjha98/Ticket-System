import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../services/ticketService';
import { getCustomers } from '../services/customerService';
import AuthContext from '../context/AuthContext';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';

const CreateTicket = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [initialNote, setInitialNote] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [loading, setLoading] = useState(false);
  const [customersLoading, setCustomersLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Only load customers if user is an agent or admin
    if (user && (user.role === 'admin' || user.role === 'agent')) {
      const fetchCustomers = async () => {
        setCustomersLoading(true);
        const response = await getCustomers();
        
        if (response.success) {
          setCustomers(response.data);
        } else {
          setError(response.error);
        }
        
        setCustomersLoading(false);
      };

      fetchCustomers();
    }
  }, [user]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleNoteChange = (e) => {
    setInitialNote(e.target.value);
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError('');
    
    const ticketData = {
      title,
      initialNote,
      attachment
    };
    
    // If admin or agent, include the customer ID
    if (user.role !== 'customer' && selectedCustomer) {
      ticketData.customerId = selectedCustomer;
    }
    
    const response = await createTicket(ticketData);
    
    if (response.success) {
      navigate(`/tickets/${response.data._id}`);
    } else {
      setError(response.error);
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Ticket
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          {user && (user.role === 'admin' || user.role === 'agent') && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="customer-select-label">Customer</InputLabel>
              <Select
                labelId="customer-select-label"
                id="customer-select"
                value={selectedCustomer}
                label="Customer"
                onChange={handleCustomerChange}
                required
                disabled={customersLoading}
              >
                {customersLoading ? (
                  <MenuItem value="">
                    <CircularProgress size={20} />
                  </MenuItem>
                ) : (
                  customers.map((customer) => (
                    <MenuItem key={customer._id} value={customer._id}>
                      {customer.name} ({customer.email})
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          )}
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Ticket Title"
            value={title}
            onChange={handleTitleChange}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="initialNote"
            label="Description"
            multiline
            rows={6}
            value={initialNote}
            onChange={handleNoteChange}
          />
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<AttachFileIcon />}
            >
              {attachment ? attachment.name : 'Attach File'}
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            
            <Box>
              <Button
                variant="outlined"
                onClick={() => navigate('/tickets')}
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                disabled={loading || !title.trim() || !initialNote.trim()}
              >
                {loading ? 'Submitting...' : 'Submit Ticket'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateTicket; 