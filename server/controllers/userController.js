const User = require('../models/userModel');

//Create user
const createUser = async(req,res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser)
        console.log("new user information " + newUser)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific user by ID
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

  // Update a user by ID
const updateUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
}
