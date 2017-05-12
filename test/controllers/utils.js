const utils = require('../../controllers/utils.js');
const should = require('chai').should();
const httpMocks = require('node-mocks-http');

describe('Testing controllers/utils.js', function() {

  describe('#sendInternalServerError', function() {

    it('should set the response status to 500', function() {

      const response = httpMocks.createResponse();

      utils.sendInternalServerError(response);

      response.statusCode.should.be.equal(500);

    });

    it('should send an object with an errorMessage property', function() {

      const response = httpMocks.createResponse();

      utils.sendInternalServerError(response);

      response._getData().should.have.property('errorMessage');

    });

    it('should set the value of the errorMessage property to \'Internal server error\'', function() {

      const response = httpMocks.createResponse();

      utils.sendInternalServerError(response);

      response._getData().errorMessage.should.be.equal('Internal server error.');

    });

    it('should send the response', function() {

      const response = httpMocks.createResponse();

      utils.sendInternalServerError(response);

      response._isEndCalled().should.be.equal(true);

    });

  });

  describe('#sendBadRequest', function() {

    it('should set the response status to 400', function() {

      const response = httpMocks.createResponse();

      utils.sendBadRequest(response, 'foobar');

      response.statusCode.should.be.equal(400);

    });

    it('should add an errorMessage property to the response', function() {

      const response = httpMocks.createResponse();

      utils.sendBadRequest(response, 'foobar');

      response._getData().should.have.property('errorMessage');

    });

    it('should set the value of the errorMessage property to the passed in value', function() {

      const response = httpMocks.createResponse();

      utils.sendBadRequest(response, 'foobar');

      response._getData().errorMessage.should.be.equal('foobar');

    });

    it('should send the response', function() {

      const response = httpMocks.createResponse();

      utils.sendBadRequest(response, 'foobar');

      response._isEndCalled().should.be.equal(true);

    });

  });

});
