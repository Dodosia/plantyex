const express = require('express');
const routerPlants = express.Router();
const plantsController = require('../controllers/plantsController');

routerPlants.get('/plants', plantsController.getPlants);
routerPlants.post('/plants', plantsController.createPlant);

module.exports = routerPlants;
