const express = require('express');
const CartController = require('../controllers/cartController');

const setCartRoutes = (app) => {
    const cartController = new CartController();

    app.post('/api/cart', cartController.addItem.bind(cartController));
    app.delete('/api/cart/:itemId', cartController.removeItem.bind(cartController));
    app.get('/api/cart', cartController.getCart.bind(cartController));
};

module.exports = setCartRoutes;