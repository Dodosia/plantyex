const db = require('../config/db');

const getAllExchangeHistory = async () => {
    const result = await db.query('SELECT * FROM exchange_history');
    return result.rows;
};

const addExchangeHistory = async (sender_id, receiver_id, plant_id) => {
    const result = await db.query(
        'INSERT INTO exchange_history (sender_id, receiver_id, plant_id) VALUES ($1, $2, $3) RETURNING *',
        [sender_id, receiver_id, plant_id]
    );
    return result.rows[0];
};

module.exports = { getAllExchangeHistory, addExchangeHistory };