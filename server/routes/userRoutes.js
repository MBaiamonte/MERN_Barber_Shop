const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {protect, admin} = require('../middleware/authenticationMiddleware')


//Middleware To Parse Cookies
router.use(require('cookie-parser')());

// Register new user
router.post('/users/register', userController.registerUser);

//Login user
router.post('/user/login', userController.login);

//Logout User
router.post('/user/logout', userController.logoutUser)

// Get all users
router.get('/users/all', userController.getAllUsers);

// Get on users by  user ID
router.get('/users/:id', protect,admin,userController.getUserById);

// Update one user by ID
router.put('/users/update/:id',protect,admin, userController.updateUserById);

// Delete user by ID
router.delete('/users/delete/:id',protect,admin, userController.deleteUserById);

module.exports = router;
