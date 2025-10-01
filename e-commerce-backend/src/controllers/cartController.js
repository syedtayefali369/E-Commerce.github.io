class CartController {
    constructor(cartModel) {
        this.cartModel = cartModel;
    }

    async addItem(req, res) {
        const { userId, productId, quantity } = req.body;
        try {
            const cart = await this.cartModel.findOneAndUpdate(
                { userId },
                { $addToSet: { items: { productId, quantity } } },
                { new: true, upsert: true }
            );
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error adding item to cart', error });
        }
    }

    async removeItem(req, res) {
        const { userId, productId } = req.body;
        try {
            const cart = await this.cartModel.findOneAndUpdate(
                { userId },
                { $pull: { items: { productId } } },
                { new: true }
            );
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error removing item from cart', error });
        }
    }

    async getCart(req, res) {
        const { userId } = req.params;
        try {
            const cart = await this.cartModel.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving cart', error });
        }
    }
}

export default CartController;