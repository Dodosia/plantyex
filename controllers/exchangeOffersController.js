const exchangeOfferModel = require('../models/exchangeOfferModel');
const { addExchangeHistory } = require('../models/exchangeHistoryModel');

const getExchangeOffers = async (req, res) => {
    try {
        const offers = await exchangeOfferModel.getAllExchangeOffers();
        res.status(200).json(offers);
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ 
            message: 'Ошибка при получении списка предложений',
            error: error.message 
        });
    }
};

const createExchangeOffer = async (req, res) => {
    const { sender_id, receiver_id, plant_id, status } = req.body;
    try {
        const newOffer = await exchangeOfferModel.addExchangeOffer(
            sender_id, 
            receiver_id, 
            plant_id, 
            status || 'pending' // Значение по умолчанию
        );

        await addExchangeHistory(sender_id, receiver_id, plant_id);
        
        res.status(201).json(newOffer);
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ 
            message: 'Ошибка при создании предложения',
            error: error.message 
        });
    }
};

module.exports = { getExchangeOffers, createExchangeOffer };