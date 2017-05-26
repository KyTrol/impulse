const Rating = require('../models/rating.model');
const utils = require('./utils');

class RatingController {

  static rate(req, res, err) {

    if (req.body.rating && !isNaN(req.body.rating) && req.body.reviewingUser && req.body.reviewedUser) { // eslint-disable-line

      const rating = new Rating({
        rating: req.body.rating,
        reviewingUser: req.body.reviewingUser,
        reviewedUser: req.body.reviewedUser,
        review: req.body.review || null
      });

      Rating.insertRating(rating)
      .then(savedRating => res.send(savedRating))
      .catch((err) => {

        console.error('error', err);
        utils.sendInternalServerError(res);

      });

    } else {

      utils.sendBadRequest(res, 'Missing parameters.');

    }

  }

  static getRatingsFor(req, res, err) {

    if (req.params.userId) {

      Rating.getRatingsFor(req.params.userId)
      .then(ratings => ratings ? res.send(ratings) : res.send([]))
      .catch((err) => {

        console.error('error', err);
        utils.sendInternalServerError(res);

      });

    } else {

      utils.sendBadRequest(res, 'Missing user id.');

    }

  }

  static getRatingsBy(req, res, err) {

    if (req.params.userId) {

      Rating.getRatingsBy(req.params.userId)
      .then(ratings => ratings ? res.send(ratings) : res.send([]))
      .catch((err) => {

        console.error('error', err);
        utils.sendInternalServerError(res);

      });

    } else {

      utils.sendBadRequest(res, 'Missing user id.');

    }

  }

}

module.exports = RatingController;
