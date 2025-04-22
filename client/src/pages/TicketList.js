import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTickets } from '../services/ticketService';
import AuthContext from '../context/AuthContext';
import moment from 'moment';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';

const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return 'error';
    case 'Pending':
      return 'warning';
    case 'Closed':
      return 'success';
    default:
      return 'default';
  }
};

const TicketList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customerIdParam = queryParams.get('customer');
  
  const { user: currentUser } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [customerFilter, setCustomerFilter] = useState(customerIdParam || '');

  const fetchTickets = async () => {
    setLoading(true);
    setError('');
    
    const response = await getTickets();
    
    if (response.success) {
      setTickets(response.data);
      setFilteredTickets(response.data);
    } else {
      setError(response.error);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Set customer filter from URL parameter when component mounts
  useEffect(() => {
    if (customerIdParam) {
      setCustomerFilter(customerIdParam);
    }
  }, [customerIdParam]);

  useEffect(() => {
    // Apply filters
    let result = tickets;
    
    // Filter by customer if set
    if (customerFilter) {
      result = result.filter((ticket) => ticket.customer._id === customerFilter);
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter((ticket) => ticket.status === statusFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(term) ||
          ticket.ticketId.toLowerCase().includes(term) ||
          ticket.customer.name.toLowerCase().includes(term)
      );
    }
    
    setFilteredTickets(result);
  }, [searchTerm, statusFilter, tickets, customerFilter]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleRefresh = () => {
    fetchTickets();
  };

  if (loading && tickets.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Support Tickets
        </Typography>
        <Box>
          <Button 
            component={Link} 
            to="/tickets/new" 
            variant="contained" 
            startIcon={<AddIcon />}
            sx={{ mr: 1 }}
          >
            New Ticket
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', mb: 3, gap: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            label="Status"
            onChange={handleStatusFilterChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      {filteredTickets.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1">
            No tickets found. {tickets.length > 0 ? 'Try adjusting your filters.' : ''}
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket._id} hover>
                  <TableCell>{ticket.ticketId}</TableCell>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>
                    <Chip 
                      label={ticket.status} 
                      color={getStatusColor(ticket.status)} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>{ticket.customer.name}</TableCell>
                  <TableCell>{moment(ticket.updatedAt).format('MMM D, YYYY h:mm A')}</TableCell>
                  <TableCell>
                    <Button 
                      component={Link} 
                      to={`/tickets/${ticket._id}`} 
                      size="small" 
                      variant="outlined"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TicketList; 