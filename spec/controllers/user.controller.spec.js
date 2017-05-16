const httpMocks = require('node-mocks-http');
const expect = require('chai').expect;
const sinon = require('sinon');
const User = require('../../models/user.model');
const UserController = require('../../controllers/user.controller.js');
const utils = require('../../controllers/utils.js');

describe('UserController', function() {

  describe('.login()', function() {

    var request;
    var response;
    var userController;

    beforeEach(function() {

      response = httpMocks.createResponse();
      request = httpMocks.createRequest();
      userController = new UserController();

    });

    it('should send the user if the request has a user property', function() {

      request.user = { username: "user" };

      userController.login(request, response);

      expect(response.statusCode).to.equal(200);
      expect(response._getData().username).to.exist;
      expect(response._isEndCalled()).to.equal(true);


    });

    it('should send a response with a 401 status if there is no user', function() {

      userController.login(request, response);

      expect(response.statusCode).to.equal(401);
      expect(response._isEndCalled()).to.equal(true);

    });

    it('should send a response with an errorMessage property is there is no user', function() {

      userController.login(request, response);

      expect(response._getData().errorMessage).to.exist;
      expect(response._isEndCalled()).to.equal(true);

    });

    it('should send the errorMessage \'Invalid username or password\' if there is no user', function() {

      userController.login(request, response);

      expect(response._getData().errorMessage).to.equal('Invalid username or password.');
      expect(response._isEndCalled()).to.equal(true);

    });

  });

  describe('.logout()', function() {

    var request;
    var response;
    var userController;

    beforeEach(function() {

      response = httpMocks.createResponse();
      request = httpMocks.createRequest();
      userController = new UserController();

    });

    it('should call request.logout ()', function() {

      request.logout = sinon.spy();

      userController.logout(request, response);

      expect(request.logout.calledOnce).to.equal(true);

    });

    it('should send a 200 status', function() {

      request.logout = () => {};

      userController.logout(request, response);

      expect(response.statusCode).to.equal(200);
      expect(response._isEndCalled()).to.equal(true);

    });

  });

  describe('.signup()', function() {

    var request;
    var response;
    var userController;
    var sendBadRequest;
    var sendInternalServerError;

    beforeEach(function() {

      response = httpMocks.createResponse();
      request = httpMocks.createRequest();
      userController = new UserController();
      sendBadRequest = sinon.spy(utils, "sendBadRequest");
      sendInternalServerError = sinon.spy(utils, "sendInternalServerError");

    });

    afterEach(function() {

      utils.sendBadRequest.restore();
      utils.sendInternalServerError.restore();

    });

    it('should call utils.sendBadRequest() if firstName is missing from the body', function() {

      request.body = { lastName: "", username: "", password: "", confirmPassword: "" };
      userController.signup(request, response);

      expect(sendBadRequest.calledOnce).to.equal(true);

    });

    it('should call utils.sendBadRequest() if lastName is missing from the body', function() {

      request.body = { firstName: "", username: "", password: "", confirmPassword: "" };
      userController.signup(request, response);

      expect(sendBadRequest.calledOnce).to.equal(true);

    });

    it('should call utils.sendBadRequest() if username is missing from the body', function() {

      request.body = { firstName: "", lastName: "", password: "", confirmPassword: "" };
      userController.signup(request, response);

      expect(sendBadRequest.calledOnce).to.equal(true);

    });

    it('should call utils.sendBadRequest() if password is missing from the body', function() {

      request.body = { firstName: "", lastName: "", username: "", confirmPassword: "" };
      userController.signup(request, response);

      expect(sendBadRequest.calledOnce).to.equal(true);

    });

    it('should call utils.sendBadRequest() if confirmPassword is missing from the body', function() {

      request.body = { firstName: "", lastName: "", username: "", password: "" };
      userController.signup(request, response);

      expect(sendBadRequest.calledOnce).to.equal(true);

    });

    it('should call utils.sendBadRequest if the password and confirmPassword do not match', function() {

      request.body = { firstName: "", lastName: "", username: "", password: "foo", confirmPassword: "bar" };
      userController.signup(request, response);

      expect(sendBadRequest.calledOnce).to.equal(true);

    });

    it('should call utils.sendInternalServerError if User.findByUsername throws an exception', function() {

    });

    it('should call sendBadRequest if the username is already take', function() {

    });

    it('should call User.signup if the username does not exist', function() {

    });

    it('should send back the user signup was successfull', function() {

    });

    it('should call utils.sendInternalServerError if signup failed', function() {

    });


  });

  describe('.getUser()', function() {

	  it('should call utils.sendBadRequest if username not given', function() {

	  });

	  it('should send a 404 if the requested user does not exist.', function() {

	  });

	  it('should send an errorMessage of \'User not found.\ if requested user does not exist', function() {

	  });

	  it('should send the requested user if the user does exist.', function() {

	  });

  });

  describe('.updateInfo()', function() {

	  it('should call utils.sendBadRequest if firstName missing from body', function() {

	  });

	  it('should call utils.sendBadRequest if lastName missing from body', function() {

	  });

	  it('should call utils.sendBadRequest if bio missing from body', function() {

	  });

	  it('should call utils.sendBadRequest if url missing from body', function() {

	  });

	  it('should call User.updateInfo', function() {

	  });

	  it('should return the updated user info if the update was successfull', function() {

	  });

	  it('should call utils.sendInternalServerError if an exception if caught', function() {

	  });

  });

});
