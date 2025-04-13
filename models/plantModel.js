const db = require('../config/db');

const getAllPlants = async () => {
    try {
        const result = await db.query(`
            SELECT 
                p.*, 
                u.name as owner_name,
                u.email as owner_email
            FROM plants p
            JOIN users u ON p.user_id = u.id
        `);
        return result.rows;
    } catch (error) {
        console.error('Error fetching plants:', error.message);
        throw error;
    }
};

const addPlant = async (user_id, name, species, description, region) => {
    try {
        const result = await db.query(
            `INSERT INTO plants 
             (user_id, name, species, description, region) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING *`,
            [user_id, name, species, description, region]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Ошибка при добавлении растения:', error.message);
        throw error;
    }
};

module.exports = { getAllPlants, addPlant };