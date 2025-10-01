const express = require('express');
const FavoritesController = require('../controllers/favoritesController');

const setFavoritesRoutes = (app) => {
    const router = express.Router();
    const favoritesController = new FavoritesController();

    router.post('/favorites', favoritesController.addFavorite.bind(favoritesController));
    router.delete('/favorites/:id', favoritesController.removeFavorite.bind(favoritesController));
    router.get('/favorites', favoritesController.getFavorites.bind(favoritesController));

    app.use('/api', router);
};

module.exports = setFavoritesRoutes;