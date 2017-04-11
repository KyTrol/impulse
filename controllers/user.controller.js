const User = require('../models/user.model');

class UserController {

  login(req, res, err) {

    if (req.user) {
      res.send(req.user);
    } else {
      res.status(401);
      res.send({
        errorMessage: 'Invalid username or password.'
      });
    }

  }

  logout(req, res, err) {
    req.logout();
    res.sendStatus(200);
  }

  signup(req, res, err) {
    if (req.body.firstName && req.body.lastName && req.body.username && req.body.password && req.body.confirmPassword) {
      if (req.body.password === req.body.confirmPassword) {
        //const whiteList = /[^a-zA-Z0-9]/g;

        User.findByUsername(req.body.username).then(function(user) {

          if (!user) {
            const user = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              username: req.body.username.toLowerCase(),
              password: req.body.password
            });

            User.signup(user).then(user => {
              res.send(user);
            }).catch(function(err) {
              console.error(err);
              sendInternalServerError(res);
            })

            /*user.save().then(function(user) {
                res.send(user);
            }).catch(function(err) {
                console.error(err);
                sendInternalServerError(res);
            });*/
          } else {
            sendBadRequest(res, 'Username already taken.');
          }

        }).catch(function(err) {
          console.error(err);
          sendInternalServerError(res);
        });

      } else {
        sendBadRequest(res, 'Passwords did not match.');
      }
    } else {
      sendBadRequest(res, 'Missing parameters.');
    }
  }

  getUser(req, res, err) {
    const username = req.params.username.toLowerCase();

    if (username) {
      User.findByUsername(username).then(user => {

        if (user) {
          res.send(user);
        } else {
          res.status(404);
          res.send({
            errorMessage: 'User not found.'
          });
        }

      });
    }

  }

  updateInfo(req, res, err) {

    if (req.body.firstName && req.body.lastName && req.body.bio && req.body.url) {

      console.log('controller', req.user._id);

      const user = new User({
        _id: req.user._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.body.bio,
        url: req.body.url
      });

      User.updateInfo(user).then(user => {
        console.log('user', user);
        res.send(user);

      }).catch(err => {
        console.error(err);
        sendInternalServerError(res);
      });

    } else {
      sendBadRequest(res, 'Missing parameters.');
    }

  }

}

function sendInternalServerError(res) {
  res.status(500);
  res.send({
    errorMessage: 'Internal server error.'
  });
}

function sendBadRequest(res, message) {
  res.status(400);
  res.send({
    errorMessage: message
  });
}


module.exports = UserController;
