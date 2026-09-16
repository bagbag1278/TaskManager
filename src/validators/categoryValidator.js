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


// CreateValidator

const createCategoryValidator = [
    body('name')
        .notEmpty().withMessage('نام دسته‌بندی الزامی است')
        .isString().withMessage('نام باید متن باشد')
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('نام باید بین ۲ تا ۵۰ کاراکتر باشد'),

    validate
];


// UpdateValidator 

const updateCategoryValidator = [
    param('id')
        .isInt({ min: 1 }).withMessage('ID باید عددی مثبت باشد'),

    body('name')
        .notEmpty().withMessage('نام دسته‌بندی الزامی است')
        .isString().withMessage('نام باید متن باشد')
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('نام باید بین ۲ تا ۵۰ کاراکتر باشد'),

    validate
];


// Patch Validator 

const patchCategoryValidator = [
    param('id')
        .isInt({ min: 1 }).withMessage('ID باید عددی مثبت باشد'),

    body('name')
        .optional()
        .isString().withMessage('نام باید متن باشد')
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('نام باید بین ۲ تا ۵۰ کاراکتر باشد'),

    validate
];

// ID validate

const idValidator = [
    param('id')
        .isInt({ min: 1 }).withMessage('ID باید عددی مثبت باشد'),

    validate
];

module.exports = {
    createCategoryValidator,
    updateCategoryValidator,
    patchCategoryValidator,
    idValidator
};