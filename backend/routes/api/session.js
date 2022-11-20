// backend/routes/api/session.js
const express = require('express')
// backend/routes/api/session.js

// backend/routes/api/session.js
// ...
const { check } = require('express-validator');
const { handleValidationErrors, handleInputValidationErrors } = require('../../utils/validation');
// ...
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');


const router = express.Router();

// backend/routes/api/session.js
// ...

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .withMessage('Email or username is required'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password is required'),
    handleInputValidationErrors
  ];
// backend/routes/api/session.js
// ...

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        // const err = new Error('Login failed');
        // err.status = 401;
        // err.title = 'Login failed';
        // err.errors = ['The provided credentials were invalid.'];
        // return next(err);
        res.status(401)
        res.json({
          errors: {
          message: "Invalid credentials",
          statusCode: 401
        }})
      }
      const token = await setTokenCookie(res, user);
      const currentUser = {...user}
      return res.json({
        ...currentUser.dataValues, token
      });
    }
  );

  // backend/routes/api/session.js
// ...

// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  // ...
// backend/routes/api/session.js
// ...

// Restore session user
router.get('/', restoreUser, (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: {...user.toSafeObject()}
        });
      } else return res.json({user: null});
    }
  );

  // ...
module.exports = router;
