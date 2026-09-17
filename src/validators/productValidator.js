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

const createProductValidator = [
    body('name')
        .notEmpty().withMessage('نام محصول الزامی است')
        .isLength({ min: 2, max: 100 }).withMessage('نام بین ۲ تا ۱۰۰ کاراکتر'),

    body('price')
        .notEmpty().withMessage('قیمت الزامی است')
        .isFloat({ min: 0 }).withMessage('قیمت باید عددی مثبت باشد'),

    body('stock')
        .notEmpty().withMessage('موجودی الزامی است')
        .isInt({ min: 0 }).withMessage('موجودی باید عددی مثبت باشد'),

    body('categoryId')
        .notEmpty().withMessage('دسته‌بندی الزامی است')
        .isInt({ min: 1 }).withMessage('ID دسته‌بندی معتبر نیست'),

    validate
];

const updateProductValidator = [
    param('id').isInt({ min: 1 }).withMessage('ID معتبر نیست'),

    body('name')
        .notEmpty().withMessage('نام الزامی است')
        .isLength({ min: 2, max: 100 }).withMessage('نام بین ۲ تا ۱۰۰ کاراکتر'),

    body('price')
        .notEmpty().withMessage('قیمت الزامی است')
        .isFloat({ min: 0 }).withMessage('قیمت باید عددی مثبت باشد'),

    body('stock')
        .notEmpty().withMessage('موجودی الزامی است')
        .isInt({ min: 0 }).withMessage('موجودی باید عددی مثبت باشد'),

    body('categoryId')
        .notEmpty().withMessage('دسته‌بندی الزامی است')
        .isInt({ min: 1 }).withMessage('ID دسته‌بندی معتبر نیست'),

    validate
];

const patchProductValidator = [
    param('id').isInt({ min: 1 }).withMessage('ID معتبر نیست'),

    body('name').optional().isLength({ min: 2, max: 100 }).withMessage('نام بین ۲ تا ۱۰۰ کاراکتر'),
    body('price').optional().isFloat({ min: 0 }).withMessage('قیمت باید عددی مثبت باشد'),
    body('stock').optional().isInt({ min: 0 }).withMessage('موجودی باید عددی مثبت باشد'),
    body('categoryId').optional().isInt({ min: 1 }).withMessage('ID دسته‌بندی معتبر نیست'),

    validate
];


const idValidator = [
    param('id').isInt({ min: 1 }).withMessage('ID معتبر نیست'),
    validate
];

module.exports = {
    createProductValidator,
    updateProductValidator,
    patchProductValidator,
    idValidator
};