const express = require('express');
const routerExchangeOffers = express.Router();
const exchangeOffersController = require('../controllers/exchangeOffersController');

routerExchangeOffers.get('/offers', exchangeOffersController.getExchangeOffers);
routerExchangeOffers.post('/offers', exchangeOffersController.createExchangeOffer);

module.exports = routerExchangeOffers;