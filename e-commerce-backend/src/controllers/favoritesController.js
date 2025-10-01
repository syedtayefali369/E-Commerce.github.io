class FavoritesController {
    constructor(FavoriteModel) {
        this.FavoriteModel = FavoriteModel;
    }

    async addFavorite(req, res) {
        try {
            const { userId, productId } = req.body;
            const favorite = await this.FavoriteModel.create({ userId, productId });
            res.status(201).json(favorite);
        } catch (error) {
            res.status(500).json({ message: 'Error adding favorite', error });
        }
    }

    async removeFavorite(req, res) {
        try {
            const { userId, productId } = req.params;
            await this.FavoriteModel.deleteOne({ userId, productId });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error removing favorite', error });
        }
    }

    async getFavorites(req, res) {
        try {
            const { userId } = req.params;
            const favorites = await this.FavoriteModel.find({ userId });
            res.status(200).json(favorites);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching favorites', error });
        }
    }
}

export default FavoritesController;