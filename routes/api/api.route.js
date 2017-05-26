const express = require('express');
const userRouteCreator = require('./user.route');
const ratingRouterCreator = require('./rating.route');

const router = express.Router();

module.exports = (passport) => {

  router.use('/user', userRouteCreator(passport));
  router.use('/rating', ratingRouterCreator(passport));
  return router;

};
