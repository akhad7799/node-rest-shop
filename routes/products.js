const express = require('express');
const router = express.Router();
const {Product, validate} = require('../modules/product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
    const products = await Product.find().sort('name');
    res.send(products);
});

router.post('/', [auth, admin], async (req, res) => {
    const {error} = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let product = new Product({
        name: req.body.name,
        price: req.body.price,
    });
    product = await product.save();
    res.status(201).send(product);
});

router.get('/:id', [auth, admin], async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).send('Nothing found by given id')
    }
    res.send(product);
});

router.put('/:id', [auth, admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        price: req.body.price
    }, {new: true});

    if (!product) {
        return res.status(404).send('Nothing found by given id')
    }
    res.send(product);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
        return res.status(404).send('Nothing found by given id')
    }
    res.send(product);
});

module.exports = router;

