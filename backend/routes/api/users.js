// backend/routes/api/users.js
const express = require('express');
// backend/routes/api/users.js
// ...
const { check } = require('express-validator');
const { handleValidationErrors, handleInputValidationErrors } = require('../../utils/validation');
// ...
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
// backend/routes/api/users.js
// ...
// const validateSignup = [
//     check('email')
//       .exists({ checkFalsy: true })
//       .isEmail()
//       .withMessage('Please provide a valid email.'),
//     check('username')
//       .exists({ checkFalsy: true })
//       .isLength({ min: 4 })
//       .withMessage('Please provide a username with at least 4 characters.'),
//     check('username')
//       .not()
//       .isEmail()
//       .withMessage('Username cannot be an email.'),
//     check('password')
//       .exists({ checkFalsy: true })
//       .isLength({ min: 6 })
//       .withMessage('Password must be 6 characters or more.'),
//     handleInputValidationErrors
//   ];
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required')
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
    check('password')
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
    check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  handleInputValidationErrors
];
const router = express.Router();
// backend/routes/api/users.js
// ...

// Sign up
router.post('/', validateSignup, async (req, res) => {
      const { firstName, lastName, email, password, username,  } = req.body;
      const { Op } = require("sequelize");
      const emailExists = await User.scope("defaultScope","signUp").findOne({
        where: {
          email: email
        }
      })
      const usernameExists = await User.scope("defaultScope", "signUp").findOne({
        where: {
          username: username
        }
      })
console.log(usernameExists.toJSON())
      if (emailExists && emailExists.dataValues.email === email){
        res.status(403)
        return res.json({
          message: "User already exists",
          statusCode: 403,
          errors: {
            email: "User with that email already exists"
          }
        })
      }else if (usernameExists && usernameExists.dataValues.username === username){
        res.status(403)
        return res.json({
          message: "User already exists",
          statusCode: 403,
          errors: {
            email: "User with that username already exists"
          }
        })
      }

      const user = await User.signup({firstName, lastName, email, username, password});

     const token = await setTokenCookie(res, user);
     console.log(token)
     const currentUser = {...user}
     return res.json({
       ...currentUser.dataValues, token
     });
    }
  );




module.exports = router;
