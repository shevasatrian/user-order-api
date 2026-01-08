const orderService = require('../services/order.service');
const { createOrderSchema } = require('../validations/order.validation');

exports.createOrder = async (req, res) => {
    try {
        const { error, value } = createOrderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const order = await orderService.createOrder(
            req.params.userId,
            value.amount
        );

        res.status(201).json(order);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || 'Internal server error'
        });
    }
};

exports.getOrderByUser = async (req, res) => {
    try {
        const orders = await orderService.getOrdersByUser(req.params.userId);
        res.json({
            data: orders
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || 'Internal server error'
        });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.json(order);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || 'Internal server error'
        });
    }
};