import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const AdminRoute = ({ children, roles = ['admin'] }) => {
  const { user, loading, isAuthenticated } = useContext(AuthContext);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Check if user is authenticated and has the required role
  if (isAuthenticated && user && roles.includes(user.role)) {
    return children;
  }

  // Redirect to tickets page if authenticated but wrong role
  return isAuthenticated ? <Navigate to="/tickets" /> : <Navigate to="/login" />;
};

export default AdminRoute; 