const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./config/db');
const setCartRoutes = require('./routes/cartRoutes');
const setFavoritesRoutes = require('./routes/favoritesRoutes');
const setUserRoutes = require('./routes/userRoutes');
const setProductRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
dbConfig();

// Routes
setCartRoutes(app);
setFavoritesRoutes(app);
setUserRoutes(app);
setProductRoutes(app);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});