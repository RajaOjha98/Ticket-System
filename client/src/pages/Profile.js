import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import AuthContext from '../context/AuthContext';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  Divider,
  Avatar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      confirmPassword: ''
    }
  });
  
  const password = watch('password', '');

  const onSubmit = async (data) => {
    setSuccess('');
    setError('');
    setLoading(true);
    
    // Only include password if it's provided
    const updateData = {
      name: data.name,
      email: data.email
    };
    
    if (data.password) {
      updateData.password = data.password;
    }
    
    const result = await updateProfile(updateData);
    
    if (result.success) {
      setSuccess('Profile updated successfully!');
      // Clear password fields
      setValue('password', '');
      setValue('confirmPassword', '');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  if (!user) {
    return (
      <Alert severity="info">
        Please log in to view your profile.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        My Profile
      </Typography>
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, mr: 2, bgcolor: 'primary.main' }}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
              {user.role}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            autoComplete="name"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: { 
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              } 
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          
          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Change Password (Optional)
          </Typography>
          
          <TextField
            margin="normal"
            fullWidth
            label="New Password"
            type="password"
            id="password"
            autoComplete="new-password"
            {...register('password', { 
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          
          <TextField
            margin="normal"
            fullWidth
            label="Confirm New Password"
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', { 
              validate: value => 
                !password || value === password || 'Passwords do not match'
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile; 