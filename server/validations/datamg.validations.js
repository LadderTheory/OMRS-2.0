const { body, param, validationResult } = require('express-validator');

exports.validateNewDatamg = [
    body('name')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Name is required')
      .bail()
      .isLength({ min: 1, max: 100 })
      .withMessage('Name must be between 1 and 100 characters')
      .bail(),
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors)
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });
      next();
    },
  ];

  exports.validateUpdateDatamg = [
    param('id')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('ID param is required')
      .bail()
      .isMongoId()
      .withMessage('ID param must be a mongoID')
      .bail(),
    body('name')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Name is required')
      .bail()
      .isLength({ min: 1, max: 100 })
      .withMessage('Name must be between 1 and 100 characters')
      .bail(),
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors)
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });
      next();
    },
  ];

  exports.validateDatamgID = [
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