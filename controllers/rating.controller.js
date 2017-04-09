const Rating = require('../models/rating.model.js');

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
               sendInternalServerError(res);
            });
        } else {
            sendBadRequest(res, "Missing parameters.");
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
               sendInternalServerError(res);
            });
            
        } else {
            sendBadRequest(res, "Missing user id.");
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
               sendInternalServerError(res);
            });
            
        } else {
            sendBadRequest(res, "Missing user id.");
        }
    }
    
}

function sendInternalServerError(res) {
    res.status(500);
    res.send({errorMessage: 'Internal server error.'});
}

function sendBadRequest(res, message) {
    res.status(400);
    res.send({errorMessage: message});
}

module.exports = RatingController