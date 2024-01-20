const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create new user
router.post('/users/create', userController.createUser);

// Get all users
router.get('/users/all', userController.getAllUsers);

// Get on users by  user ID
router.get('/users/:id', userController.getUserById);

// Update one user by ID
router.put('/users/update/:id', userController.updateUserById);

// Delete user by ID
router.delete('/users/delete/:id', userController.deleteUserById);

module.exports = router;
