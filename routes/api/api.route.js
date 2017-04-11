const express = require('express');
const router = express.Router();

const userRouteCreator = require('./user.route');
const ratingRouterCreator = require('./rating.route');

module.exports = (passport) => {
  router.use('/user', userRouteCreator(passport));
  router.use('/rating', ratingRouterCreator(passport));
  return router;
};
