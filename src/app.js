const express = require('express');
require('dotenv').config();

const userRoutes = require('./routers/user.routes');
const orderRoutes = require('./routers/order.routes');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use(orderRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});

module.exports = app;