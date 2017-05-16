const httpMocks = require('node-mocks-http');
const expect = require('chai').expect;
const sinon = require('sinon');
const Rating = require('../../models/rating.model');
const RatingController = require('../../controllers/rating.controller.js');
const utils = require('../../controllers/utils.js');

describe('RatingController', function() {

	describe('.rate()', function() {

		it('should call utils.sendBadRequest if rating is missing from body', function() {

		});

		it('should call utils.sendBadRequest if rating is not a number', function() {

		});

		it('should call utils.sendBadRequest if reviewingUser is missing from the body', function() {

		});

		it('should call utils.sendBadRequest if reviewedUser is missing from the body', function() {

		});

		it('should call Rating.insertRating if all parameters are valid', function() {

		});

		it('should send back the new rating if creating the new rating was successfull', function() {

		});

		it('should call utils.sendInternalServerError if creating the rating was not successfull', function() {

		})

	});

	describe('.getRatingsFor()', function() {

		it('should call utils.sendBadRequest if userId is missing from the params', function() {

		});

		it('should send back ratings for the user if they exist', function() {

		});

		it('should send back an empty list the ratings for the user do not exist', function() {

		});

		it('should call utils.sendInternalServerError if an exception is caught', function() {

		});

	});

	describe('.getRatingsBy()', function() {

		it('should call utils.sendBadRequest if userId is missing from the params', function() {

		});

		it('should send back ratings by the user if they exist', function() {

		});

		it('should send back an empty list the ratings by the user do not exist', function() {

		});

		it('should call utils.sendInternalServerError if an exception is caught', function() {

		});

	});

});
