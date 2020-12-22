const { body, validationResult } = require('express-validator');

exports.validateNewMission = [
    body('msnNumber')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('MsnNumber cannot be blank')
      .bail()
      .isAlphanumeric()
      .withMessage('MsnNumber must be alphanumeric')
      .bail()
      .isLength({min: 5, max: 15})
      .withMessage('MsnNumber must be between 5 and 15 characters')
      .bail(),
    body('callSign')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Callsign cannot be blank')
      .bail()
      .isAlphanumeric()
      .withMessage('Callsign must be alphanumeric')
      .bail()
      .isLength({min: 5, max: 15})
      .withMessage('Callsign must be between 5 and 15 characters')
      .bail(), 
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors)
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];