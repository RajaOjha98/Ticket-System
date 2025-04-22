import axios from 'axios';

// Get all customers (admin/agent only)
export const getCustomers = async () => {
  try {
    const res = await axios.get('/api/customers');
    return { success: true, data: res.data };
  } catch (err) {
    return { 
      success: false, 
      error: err.response?.data?.message || 'Failed to fetch customers'
    };
  }
};

// Get customer by ID (admin/agent only)
export const getCustomerById = async (id) => {
  try {
    const res = await axios.get(`/api/customers/${id}`);
    return { success: true, data: res.data };
  } catch (err) {
    return { 
      success: false, 
      error: err.response?.data?.message || 'Failed to fetch customer'
    };
  }
};

// Get all users (admin only)
export const getUsers = async () => {
  try {
    const res = await axios.get('/api/users');
    return { success: true, data: res.data };
  } catch (err) {
    return { 
      success: false, 
      error: err.response?.data?.message || 'Failed to fetch users'
    };
  }
};

// Create new user (admin only)
export const createUser = async (userData) => {
  try {
    const res = await axios.post('/api/users', userData);
    return { success: true, data: res.data };
  } catch (err) {
    return { 
      success: false, 
      error: err.response?.data?.message || 'Failed to create user'
    };
  }
};

// Update user (admin only)
export const updateUser = async (id, userData) => {
  try {
    const res = await axios.put(`/api/users/${id}`, userData);
    return { success: true, data: res.data };
  } catch (err) {
    return { 
      success: false, 
      error: err.response?.data?.message || 'Failed to update user'
    };
  }
};

// Delete user (admin only)
export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`/api/users/${id}`);
    return { success: true, data: res.data };
  } catch (err) {
    return { 
      success: false, 
      error: err.response?.data?.message || 'Failed to delete user'
    };
  }
}; 