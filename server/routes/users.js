const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected routes
router.get('/profile', protect, userController.getUserProfile);
router.put('/profile', protect, userController.updateUserProfile);

// Admin only routes
router.route('/')
  .get(protect, authorize('admin'), userController.getUsers)
  .post(protect, authorize('admin'), userController.createUser);

router.route('/:id')
  .put(protect, authorize('admin'), userController.updateUser)
  .delete(protect, authorize('admin'), userController.deleteUser);

module.exports = router; 