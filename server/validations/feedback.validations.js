const {body, param, validationResult } = require('express-validator');

exports.validateNewFeedback = [
    body('feedbackType')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Feedback Type is required')
    .bail(),
    body('firstName')
    .trim()
    .escape()
    .isLength( { max: 50 })
    .withMessage('First Name must be less than 50 characters')
    .bail(),
    body('lastName')
    .trim()
    .escape()
    .isLength( { max: 50 })
    .withMessage('Last Name must be less than 50 characters')
    .bail(),
    body('squadron')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Squadron is required')
    .bail()
    .isLength( { max: 50 })
    .withMessage('Squadron must be less than 50 characters')
    .bail(),
    body('urgency')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Urgency is required')
    .bail(),
    body('phone')
    .trim()
    .escape()
    .isLength({ min:12, max: 12 })
    .withMessage('Phone number must be in a phone number format')
    .bail(),
    body('email')
    .trim()
    .escape()
    .isLength({ max:50 })
    .withMessage('Email must be less than 50 characters')
    .bail(),
    body('feedback')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Comments are required')
    .bail()
    .isLength({ max:1000 })
    .withMessage('Comments must be less than 1000 characters')
    .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    }
]

exports.validateFeedbackID = [
    param('id')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('ID param is required')
    .bail()
    .isMongoId()
    .withMessage('ID param must be a mongoID')
    .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];