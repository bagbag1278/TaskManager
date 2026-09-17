const express = require('express');
const router = express.Router();

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
} = require('../controllers/productController');

const { authenticate } = require('../Middlewares/authMiddleware');
const { uploader } = require('../utils/files.util');

const {
    createProductValidator,
    updateProductValidator,
    patchProductValidator,
    idValidator
} = require('../validators/productValidator');

router.get('/', getAllProducts);
router.get('/:id', idValidator, getProductById);

router.post('/', authenticate, uploader.single('image'), createProductValidator, createProduct);
router.put('/:id', authenticate, uploader.single('image'), updateProductValidator, updateProduct);
router.patch('/:id', authenticate, uploader.single('image'), patchProductValidator, patchProduct);
router.delete('/:id', authenticate, idValidator, deleteProduct);

module.exports = router;