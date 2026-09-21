const express = require('express');
const router = express.Router();

const {
    getMyImages,
    uploadImage,
    deleteImage
} = require('../controllers/imageController');

const { authenticate } = require('../middlewares/authMiddleware');
const { uploader } = require('../utils/upload');

router.get('/', authenticate, getMyImages);
router.post('/', authenticate, uploader.single('image'), uploadImage);
router.delete('/:id', authenticate, deleteImage);

module.exports = router;