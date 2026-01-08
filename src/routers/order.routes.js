const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/users/:userId/orders', orderController.createOrder);
router.get('/users/:userId/orders', orderController.getOrderByUser);
router.get('/orders/:id', orderController.getOrderById);

module.exports = router;