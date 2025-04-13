const plantModel = require('../models/plantModel');

const getPlants = async (req, res) => {
    const { species, region } = req.query;
    try {
        const plants = await plantModel.getAllPlants(species, region);
        res.status(200).json(plants);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const createPlant = async (req, res) => {
    const { user_id, name, species, description, region } = req.body;
    try {
        const newPlant = await plantModel.addPlant(user_id, name, species, description, region);
        res.status(201).json(newPlant);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getPlants, createPlant };