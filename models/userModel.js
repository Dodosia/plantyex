const db = require('../config/db');

const getAllUsers = async () => {
    try {
        const result = await db.query('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        console.error('Error fetching users:', error.message);
        throw error; // Передает ошибку в контроллер
    }
};

const addUser = async (name, email, password) => {
    try {
        const result = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error adding user:', error.message);
        throw error;
    }
};

module.exports = { getAllUsers, addUser };