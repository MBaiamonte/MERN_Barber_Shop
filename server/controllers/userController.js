const User = require('../models/userModel');

//Description:  Create New
//Route:        POST - api/users/create
//Access:       Public
const createUser = async(req,res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//Description:  Get All Services
//Route:        GET - api/users/all
//Access:       Public
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Description:  Get One User By ID
//Route:        GET - api/users/:id
//Access:       Public
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

//Description:  Update User By ID
//Route:        PUT - api/users/update/:id
//Access:       Private
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

//Description:  Delete One User By ID
//Route:        DELETE - api/users/delete/:id
//Access:       Private
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
