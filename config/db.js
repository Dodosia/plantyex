const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL, // Важно!
    ssl: {
      rejectUnauthorized: false, // Обязательно для Railway
    },
    //user: 'dosia',
    //host: 'localhost',
    //database: 'var1',
    //password: '1234',
    //port: 5432,
});

const connectDB = async () => {
    try {
        await client.connect();
        console.log('PostgreSQL connected successfully');
    } catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
        process.exit(1);
    }
};

module.exports = {
    query: (text, params) => client.query(text, params),
    connectDB,
    client
};