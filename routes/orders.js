const {Order, validate} = require('../modules/order');
const {Product} = require('../modules/product');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    const orders = await Order.find().sort('quantity');
    res.send(orders);
});

router.post('/', auth,  async (req,res) => {
    const {error} = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const product = await Product.findOne(req.params.id);
    if (!product)
        return res.status(400).send('Nothing found by given id')
    let order = new Order({
        product: {
            _id: product._id,
            name: product.name
        },
        quantity: req.body.quantity
    });
    order = await order.save();
    res.send(order);
});

router.get('/:id', auth, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order)
        return res.status(404).send('Nothing found by given id');
    res.send(order);
});

router.delete('/:id', auth, async (req, res) => {
    const order = await Order.findByIdAndRemove(req.params.id);
    if (!order)
        return res.status(404).send('Nothing found by given id');
    res.send(order);
});

module.exports = router;