const express = require('express');
const router = express.Router();

const { register, login, updateProfile, } = require('../controllers/authController');
const { authenticate } = require('../Middlewares/authMiddleware');
const {
    registerValidator,
    loginValidator,
    updateProfileValidator
} = require('../validators/authValidator');


router.post('/register', registerValidator, register);
router.post('/login', loginValidator ,login);
router.put('/profile', updateProfileValidator ,authenticate, updateProfile);
router.get('/profile', authenticate, updateProfile);

module.exports = router;