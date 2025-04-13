const express = require('express');
const router = express.Router();
const exchangeHistoryController  = require('../controllers/exchangeHistoryController');

router.get('/history', exchangeHistoryController.getExchangeHistory);
router.post('/history', exchangeHistoryController.createExchangeHistory);

module.exports = router;