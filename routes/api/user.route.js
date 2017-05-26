const express = require('express');
const UserController = require('../../controllers/user.controller');

const router = express.Router();

module.exports = (passport) => {

  router.post('/login',
    passport.authenticate('local'),
    UserController.login
  );

  router.get('/logout',
    isLoggedIn,
    UserController.logout
  );

  router.get('/auth',
    isLoggedIn,
    UserController.login
  );

  router.post('/signup',
    UserController.signup
  );

  router.post('/update',
    UserController.updateInfo
  );

  router.get('/:username',
    isLoggedIn,
    UserController.getUser
  );

  return router;

};

function isLoggedIn(req, res, next) {

  console.log('Checking if logged in.');
  console.log('Is logged in:', req.isAuthenticated());

  if (req.isAuthenticated()) {

    return next();

  }

  res.sendStatus(401);

}
