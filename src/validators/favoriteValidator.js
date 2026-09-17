const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(e => e.msg)
        });
    }
    next();
};

const addFavoriteValidator = [
    body('productId')
        .notEmpty().withMessage('ID محصول الزامی است')
        .isInt({ min: 1 }).withMessage('ID محصول معتبر نیست'),

    validate
];

const productIdValidator = [
    param('productId')
        .isInt({ min: 1 }).withMessage('ID محصول معتبر نیست'),

    validate
];

module.exports = {
    addFavoriteValidator,
    productIdValidator
};