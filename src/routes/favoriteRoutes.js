const express = require('express');
const router = express.Router();

const {
    getMyFavorites,
    addToFavorites,
    removeFromFavorites
} = require('../controllers/favoriteController');

const { authenticate } = require('../middlewares/authMiddleware');

const {
    addFavoriteValidator,
    productIdValidator
} = require('../validators/favoriteValidator');

router.get('/', authenticate, getMyFavorites);
router.post('/', authenticate, addFavoriteValidator, addToFavorites);
router.delete('/:productId', authenticate, productIdValidator, removeFromFavorites);

module.exports = router;