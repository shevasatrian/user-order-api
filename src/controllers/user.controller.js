const userService = require('../services/user.service');
const { createUserSchema } = require('../validations/user.validation');

exports.createUser = async (req, res) => {
    try {
        const { error, value } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const user = await userService.createUser(value);
        res.status(201).json(user);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || 'Internal server error'
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page || 1);
        const limit = parseInt(req.query.limit || 5);
        const offset = (page - 1) * limit;

        const users = await userService.getUsers(limit, offset);
        res.json({
            page,
            limit,
            data: users
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || 'Internal server error'
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || 'Internal server error'
        });
    }
};