// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

const handleInputValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    let errors = validationErrors
      .mapped()
   const formattedError = {}
      for (let field in errors){
        let fieldErr = errors[field]

        for (let key in fieldErr) {
          if (key === 'msg'){
            formattedError[field] = fieldErr[key]
          }
        }

      }


    const err = Error('Validation Error');
    err.status = 400;
    err.errors = formattedError;

    next(err);
  }
  next();
};
module.exports = {
  handleValidationErrors,
  handleInputValidationErrors
};
