const express = require('express');
const { connectDB } = require('./config/db');
const usersRoutes = require('./routes/usersRoutes');
const plantsRoutes = require('./routes/plantsRoutes');
const exchangeOffersRoutes = require('./routes/exchangeOffersRoutes');
const exchangeHistoryRoutes = require('./routes/exchangeHistoryRoutes');
const path = require('path');

const app = express();
connectDB();

app.use(express.json());
app.use('/api', usersRoutes);
app.use('/api', plantsRoutes);
app.use('/api', exchangeOffersRoutes);
app.use('/api', exchangeHistoryRoutes);
app.use(express.static(path.join(__dirname, 'public')));
// app.get('/', (req, res) => {
//     res.send('Добро пожаловать на главную страницу!');
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));