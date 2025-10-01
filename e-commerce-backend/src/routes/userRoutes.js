const express = require('express');
const UserController = require('../controllers/userController');

const setUserRoutes = (app) => {
    const userController = new UserController();

    app.post('/api/users/register', userController.register);
    app.post('/api/users/login', userController.login);
    app.get('/api/users/:id', userController.getUser);
};

module.exports = setUserRoutes;