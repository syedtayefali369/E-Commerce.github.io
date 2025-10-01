# E-Commerce Backend

This project is a backend implementation for an e-commerce application. It provides RESTful APIs for managing users, products, shopping carts, and favorites.

## Features

- **User Management**: Register, login, and retrieve user information.
- **Product Management**: CRUD operations for products.
- **Shopping Cart**: Add, remove, and view items in the shopping cart.
- **Favorites**: Add, remove, and view favorite products.

## Technologies Used

- Node.js
- Express.js
- MongoDB (or any other database of your choice)
- Mongoose (for MongoDB object modeling)
- JWT (for user authentication)

## Project Structure

```
e-commerce-backend
├── src
│   ├── app.js                # Entry point of the application
│   ├── controllers           # Controllers for handling requests
│   │   ├── cartController.js
│   │   ├── favoritesController.js
│   │   ├── userController.js
│   │   └── productController.js
│   ├── routes                # Route definitions
│   │   ├── cartRoutes.js
│   │   ├── favoritesRoutes.js
│   │   ├── userRoutes.js
│   │   └── productRoutes.js
│   ├── models                # Database models
│   │   ├── Cart.js
│   │   ├── Favorite.js
│   │   ├── User.js
│   │   └── Product.js
│   └── config                # Configuration files
│       └── db.js
├── package.json              # NPM package configuration
└── README.md                 # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd e-commerce-backend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up your database configuration in `src/config/db.js`.

5. Start the server:
   ```
   npm start
   ```

## API Endpoints

- **User Routes**
  - `POST /api/users/register`: Register a new user
  - `POST /api/users/login`: Login a user
  - `GET /api/users/:id`: Get user information

- **Product Routes**
  - `GET /api/products`: Get all products
  - `GET /api/products/:id`: Get product by ID
  - `POST /api/products`: Create a new product

- **Cart Routes**
  - `POST /api/cart`: Add item to cart
  - `DELETE /api/cart/:itemId`: Remove item from cart
  - `GET /api/cart`: Get all items in cart

- **Favorites Routes**
  - `POST /api/favorites`: Add product to favorites
  - `DELETE /api/favorites/:productId`: Remove product from favorites
  - `GET /api/favorites`: Get all favorite products

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.