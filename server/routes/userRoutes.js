const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Register new user
router.post('/users/register', userController.registerUser);

//Login user
router.post('/user/login', userController.login);

//Logout User
router.post('/user/logout', userController.logoutUser)

// Get all users
router.get('/users/all', userController.getAllUsers);

// Get on users by  user ID
router.get('/users/:id', userController.getUserById);

// Update one user by ID
router.put('/users/update/:id', userController.updateUserById);

// Delete user by ID
router.delete('/users/delete/:id', userController.deleteUserById);

module.exports = router;
