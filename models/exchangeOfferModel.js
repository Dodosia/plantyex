const db = require('../config/db');

const getAllExchangeOffers = async () => {
    const query = `
        SELECT 
            o.id,
            o.status,
            p.name AS plant_name,
            s.name AS sender_name,
            r.name AS receiver_name
        FROM exchange_offers o
        JOIN plants p ON o.plant_id = p.id
        JOIN users s ON o.sender_id = s.id
        JOIN users r ON o.receiver_id = r.id
    `;
    const result = await db.query(query);
    return result.rows;
};

const addExchangeOffer = async (sender_id, receiver_id, plant_id, status) => {
    const result = await db.query(
        'INSERT INTO exchange_offers (sender_id, receiver_id, plant_id, status) VALUES ($1, $2, $3, $4) RETURNING *',
        [sender_id, receiver_id, plant_id, status]
    );
    return result.rows[0];
};

module.exports = { getAllExchangeOffers, addExchangeOffer };