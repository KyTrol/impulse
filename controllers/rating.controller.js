const Rating = require('../models/rating.model.js');
const utils = require('./utils.js');

class RatingController {

  rate(req, res, err) {
    if (req.body.rating && !isNaN(req.body.rating) && req.body.reviewingUser && req.body.reviewedUser) {
      const rating = new Rating({
       rating: req.body.rating,
       reviewingUser: req.body.reviewingUser,
       reviewedUser: req.body.reviewedUser,
       review: req.body.review || null
      });

      Rating.insertRating(rating).then(rating => {
        res.send(rating);
      }).catch(err => {
       console.error('error', err);
       utils.sendInternalServerError(res);
      });
    } else {
      utils.sendBadRequest(res, 'Missing parameters.');
    }

  }

  getRatingsFor(req, res, err) {
    if (req.params.userId) {

      Rating.getRatingsFor(req.params.userId).then(ratings => {
        if (ratings) {
          res.send(ratings);
        } else {
          res.send([]);
        }
      }).catch(err => {
        console.error('error', err);
        utils.sendInternalServerError(res);
      });

    } else {
      utils.sendBadRequest(res, 'Missing user id.');
    }
  }

  getRatingsBy(req, res, err) {
    if (req.params.userId) {
      Rating.getRatingsBy(req.params.userId).then(ratings => {
        if (ratings) {
          res.send(ratings);
        } else {
          res.send([]);
        }
      }).catch(err => {
        console.error('error', err);
        utils.sendInternalServerError(res);
      });

    } else {
      utils.sendBadRequest(res, 'Missing user id.');
    }
  }

}


module.exports = RatingController
