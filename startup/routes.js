const express = require('express');
const productsRoute = require('../routes/products');
const ordersRoute = require('../routes/orders');
const usersRoute = require('../routes/users');
const authRoute = require('../routes/auth');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/products', productsRoute);
    app.use('/api/orders', ordersRoute);
    app.use('/api/users', usersRoute);
    app.use('/api/auth', authRoute);
}