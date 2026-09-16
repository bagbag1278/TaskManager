const { body, validationResult } = require('express-validator');


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Register

const registerValidator = [
    body('email')
        .notEmpty().withMessage('ایمیل الزامی است')
        .isEmail().withMessage('ایمیل معتبر نیست'),

    body('password')
        .notEmpty().withMessage('رمز عبور الزامی است')
        .isLength({ min: 6 }).withMessage('رمز عبور باید حداقل ۶ کاراکتر باشد'),

    body('name')
        .optional()
        .isString().withMessage('نام باید متن باشد'),

    validate
];


// Login

const loginValidator = [
    body('email')
        .notEmpty().withMessage('ایمیل الزامی است')
        .isEmail().withMessage('ایمیل معتبر نیست'),

    body('password')
        .notEmpty().withMessage('رمز عبور الزامی است'),

    validate
];

// Update Profile

const updateProfileValidator = [
    body('email')
        .optional()
        .isEmail().withMessage('ایمیل معتبر نیست'),

    body('name')
        .optional()
        .isString().withMessage('نام باید متن باشد'),

    validate
];

module.exports = {
    registerValidator,
    loginValidator,
    updateProfileValidator
};