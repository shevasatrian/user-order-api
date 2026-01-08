const Joi = require("joi");

exports.createOrderSchema = Joi.object({
    amount: Joi.number().greater(0).required()
});