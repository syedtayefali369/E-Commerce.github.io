        // Product data - simulating database
        const products = [
            {
                id: 1,
                name: "Wireless Bluetooth Headphones",
                price: 79.99,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                description: "High-quality wireless headphones with noise cancellation."
            },
            {
                id: 2,
                name: "Smart Fitness Watch",
                price: 129.99,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                description: "Track your fitness goals with this advanced smartwatch."
            },
            {
                id: 3,
                name: "Laptop Backpack",
                price: 49.99,
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                description: "Durable and stylish backpack for your laptop and accessories."
            },
            {
                id: 4,
                name: "Portable Bluetooth Speaker",
                price: 59.99,
                image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                description: "Take your music anywhere with this powerful portable speaker."
            },
            {
                id: 5,
                name: "Smartphone Gimbal Stabilizer",
                price: 89.99,
                image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                description: "Capture smooth videos with this professional smartphone gimbal."
            },
            {
                id: 6,
                name: "Wireless Charging Pad",
                price: 29.99,
                image: "https://images.unsplash.com/photo-1587080413959-06b859fb1071?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                description: "Charge your compatible devices wirelessly with this sleek pad."
            }
        ];

        // Initialize cart from localStorage or create empty cart
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // DOM Elements
        const productsGrid = document.getElementById('productsGrid');
        const cartIcon = document.getElementById('cartIcon');
        const cartCount = document.getElementById('cartCount');
        const cartModal = document.getElementById('cartModal');
        const closeModal = document.getElementById('closeModal');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const toast = document.getElementById('toast');

        // Display products
        function displayProducts() {
            productsGrid.innerHTML = '';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <p class="product-description">${product.description}</p>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                `;
                productsGrid.appendChild(productCard);
            });

            // Add event listeners to "Add to Cart" buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    addToCart(productId);
                });
            });
        }

        // Add product to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }

            updateCart();
            showToast('Product added to cart!');
        }

        // Remove item from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }

        // Update quantity of item in cart
        function updateQuantity(productId, newQuantity) {
            if (newQuantity < 1) {
                removeFromCart(productId);
                return;
            }

            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
                updateCart();
            }
        }

        // Update cart display and localStorage
        function updateCart() {
            // Update cart count
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;

            // Update cart modal
            cartItems.innerHTML = '';
            let totalPrice = 0;

            if (cart.length === 0) {
                cartItems.innerHTML = '<p>Your cart is empty.</p>';
            } else {
                cart.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    totalPrice += itemTotal;

                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h3 class="cart-item-title">${item.name}</h3>
                            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                                <span class="remove-item" data-id="${item.id}">Remove</span>
                            </div>
                        </div>
                        <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
                    `;
                    cartItems.appendChild(cartItem);
                });
            }

            cartTotal.textContent = totalPrice.toFixed(2);

            // Add event listeners to cart items
            document.querySelectorAll('.quantity-btn.minus').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    const item = cart.find(item => item.id === id);
                    updateQuantity(id, item.quantity - 1);
                });
            });

            document.querySelectorAll('.quantity-btn.plus').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    const item = cart.find(item => item.id === id);
                    updateQuantity(id, item.quantity + 1);
                });
            });

            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    updateQuantity(id, parseInt(this.value));
                });
            });

            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    removeFromCart(id);
                });
            });

            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        // Show toast notification
        function showToast(message) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Event Listeners
        cartIcon.addEventListener('click', () => {
            cartModal.style.display = 'flex';
        });

        closeModal.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });

        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showToast('Your cart is empty!');
                return;
            }
            
            showToast('Order placed successfully!');
            cart = [];
            updateCart();
            cartModal.style.display = 'none';
        });

        // Initialize the page
        displayProducts();
        updateCart();
