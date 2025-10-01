const express = require('express');
const ProductController = require('../controllers/productController');

const router = express.Router();
const productController = new ProductController();

function setProductRoutes(app) {
    router.get('/', productController.getAllProducts.bind(productController));
    router.get('/:id', productController.getProductById.bind(productController));
    router.post('/', productController.createProduct.bind(productController));

    app.use('/api/products', router);
}

module.exports = setProductRoutes;