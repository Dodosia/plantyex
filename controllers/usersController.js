const userModel = require('../models/userModel');

const getUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Server Error:', error.message); // Детальное логирование
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const createUser = async (req, res) => {
    const { name, email, password} = req.body;
    try {
        const newUser = await userModel.addUser(name, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getUsers, createUser };