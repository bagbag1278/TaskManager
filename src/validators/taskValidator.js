const { query, body, param, validationResult } = require('express-validator');

// Middleware

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
           errors:errors.array().map(err => ({
                field: err.path,      
                message: err.msg
            }))
        });
    }
    next();
}

 //GetAll Validation

const getAllTasksValidator = [
    query('completed')
        .optional()
        .isIn(['true','false']).withMessage('false باشد یا باید true باشد'),

    query('search')
       .optional()
       .isString().withMessage("باید متن باشد "),

       query('page')
         .optional()
         .isInt({min:1}).withMessage('باید مثبت باشه page'),

       query('limit')
            .optional()
            .isInt({min:1 , max:100})
            .withMessage("limit باید بین 1 تا 100 باشه"),

        validate
];          

 //Create Validation

const createTaskValidator  = [
    body('title')
        .notEmpty().withMessage('عنوان الزامی است')
        .isString().withMessage('عنوان باید متن باشد')
        .trim()
        .isLength({min:3 , max:100})
        .withMessage("عنوان باید بین 30 تا 100 کارکتر باشد"),

    body('image')
        .optional()
        .isString().withMessage('نام عکس باید متن')
        .trim(),

        validate
];

module.exports = {
    validate,
    getAllTasksValidator,
    createTaskValidator
};