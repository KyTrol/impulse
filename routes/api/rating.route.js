const express = require('express');
const router = express.Router();
const RatingController = require('../../controllers/rating.controller');

module.exports = (passport) => {

  const controller = new RatingController();

  router.get('/for/:userId',
    controller.getRatingsFor
  );

  router.get('/by/:userId',
    controller.getRatingsBy
  );

  router.post('/',
    controller.rate
  );

  return router;
};
