import React, { useState, useEffect } from 'react';
import { getTicketStats } from '../services/ticketService';
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const response = await getTicketStats();
      
      if (response.success) {
        setStats(response.data);
      } else {
        setError(response.error);
      }
      
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 3 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      {stats && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              sx={{ 
                p: 3, 
                textAlign: 'center',
                backgroundColor: 'primary.main',
                color: 'white'
              }}
            >
              <Typography variant="h3">{stats.totalTickets}</Typography>
              <Typography variant="h6">Total Tickets</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              sx={{ 
                p: 3, 
                textAlign: 'center',
                backgroundColor: 'error.main',
                color: 'white'
              }}
            >
              <Typography variant="h3">{stats.activeTickets}</Typography>
              <Typography variant="h6">Active Tickets</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              sx={{ 
                p: 3, 
                textAlign: 'center',
                backgroundColor: 'warning.main',
                color: 'white'
              }}
            >
              <Typography variant="h3">{stats.pendingTickets}</Typography>
              <Typography variant="h6">Pending Tickets</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              sx={{ 
                p: 3, 
                textAlign: 'center',
                backgroundColor: 'success.main',
                color: 'white'
              }}
            >
              <Typography variant="h3">{stats.closedTickets}</Typography>
              <Typography variant="h6">Closed Tickets</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              sx={{ 
                p: 3, 
                textAlign: 'center',
                backgroundColor: 'info.main',
                color: 'white'
              }}
            >
              <Typography variant="h3">{stats.totalCustomers}</Typography>
              <Typography variant="h6">Total Customers</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard; 