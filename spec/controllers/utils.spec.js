const utils = require('../../controllers/utils.js');
const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');

describe('controllers/utils', function() {

  describe('.sendInternalServerError()', function() {

    it('should set the response status to 500', function() {

      const response = httpMocks.createResponse();

      utils.sendInternalServerError(response);

      expect(response.statusCode).to.equal(500);

    });

    it('should send an object with an errorMessage property', function() {

      const response = httpMocks.createResponse();

      utils.sendInternalServerError(response);

      expect(response._getData().errorMessage).to.exist;

    });

    it('should set the value of the errorMessage property to \'Internal server error\'', function() {

      const response = httpMocks.createResponse();

      utils.sendInternalServerError(response);

      expect(response._getData().errorMessage).to.equal('Internal server error.');

    });

    it('should send the response', function() {

      const response = httpMocks.createResponse();

      utils.sendInternalServerError(response);

      expect(response._isEndCalled()).to.equal(true);

    });

  });

  describe('.sendBadRequest()', function() {

    it('should set the response status to 400', function() {

      const response = httpMocks.createResponse();

      utils.sendBadRequest(response, 'foobar');

      expect(response.statusCode).to.equal(400);

    });

    it('should add an errorMessage property to the response', function() {

      const response = httpMocks.createResponse();

      utils.sendBadRequest(response, 'foobar');

      expect(response._getData().errorMessage).to.exist;

    });

    it('should set the value of the errorMessage property to the passed in value', function() {

      const response = httpMocks.createResponse();

      utils.sendBadRequest(response, 'foobar');

      expect(response._getData().errorMessage).to.equal('foobar');

    });

    it('should send the response', function() {

      const response = httpMocks.createResponse();

      utils.sendBadRequest(response, 'foobar');

      expect(response._isEndCalled()).to.equal(true);

    });

  });

});
