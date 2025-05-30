import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LogoIcon from '../assets/logo-icon.svg';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 3,
        bgcolor: '#f5f5f5'
      }}
    >
      <Paper elevation={3} sx={{ p: 5, textAlign: 'center', maxWidth: 500 }}>
        {/* Logo and Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <img 
            src={LogoIcon} 
            alt="DeskFlow" 
            style={{ width: 40, height: 40, marginRight: 8 }}
          />
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#2196F3' }}>
            DeskFlow
          </Typography>
        </Box>
        
        <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button 
          component={Link} 
          to="/tickets" 
          variant="contained" 
          size="large"
          sx={{ mr: 2 }}
        >
          Go to Tickets
        </Button>
        <Button 
          component={Link} 
          to="/login" 
          variant="outlined" 
          size="large"
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFound; 