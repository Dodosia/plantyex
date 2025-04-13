const exchangeHistoryModel = require('../models/exchangeHistoryModel');

const getExchangeHistory = async (req, res) => {
    try {
        const history = await exchangeHistoryModel.getAllExchangeHistory();
        res.status(200).json(history);
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ 
            message: 'Ошибка при получении истории обменов',
            error: error.message 
        });
    }
};

const createExchangeHistory = async (req, res) => {
    const { sender_id, receiver_id, plant_id } = req.body;
    try {
        const newHistory = await exchangeHistoryModel.addExchangeHistory(
            sender_id, 
            receiver_id, 
            plant_id
        );
        res.status(201).json(newHistory);
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ 
            message: 'Ошибка при добавлении записи в историю',
            error: error.message 
        });
    }
};

module.exports = { getExchangeHistory, createExchangeHistory };