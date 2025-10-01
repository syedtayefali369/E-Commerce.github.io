class ProductController {
    constructor(Product) {
        this.Product = Product;
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    }

    async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await this.Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error });
        }
    }

    async createProduct(req, res) {
        const newProduct = new this.Product(req.body);
        try {
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        } catch (error) {
            res.status(400).json({ message: 'Error creating product', error });
        }
    }
}

export default ProductController;