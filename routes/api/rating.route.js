const express = require('express');
const RatingController = require('../../controllers/rating.controller');

const router = express.Router();

module.exports = (passport) => {

  router.get('/for/:userId',
    RatingController.getRatingsFor
  );

  router.get('/by/:userId',
    RatingController.getRatingsBy
  );

  router.post('/',
    RatingController.rate
  );

  return router;

};
