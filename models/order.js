const Joi = require('joi');
const mongoose = require('mongoose');
const productSchema = require('./product');

const orderSchema = new mongoose.Schema({
    product:{
        type: productSchema,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const Order = mongoose.model('Order', orderSchema);

function validateOrder(order) {
    const schema = Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().required()
    });
    return schema.validate(order);
}

exports.Order = Order;
exports.validate = validateOrder;
