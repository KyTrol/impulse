const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const User = require('./models/user.model');

passport.use(new Strategy((username, password, done) => {

  User.login(username, password).then((user) => {

    if (user) {

      done(null, user);

    } else {

      done(null, false);

    }

  }).catch((err) => {

    console.error(err);
    done(err);

  });

}));

passport.serializeUser((user, done) => {

  done(null, user._id);

});

passport.deserializeUser((id, done) => {

  User.findByUserId(id).then((user) => {

    if (user) {

      done(null, user);

    } else {

      done({
        errorMessage: 'Invalid username or password.'
      }, false);

    }

  }).catch((err) => {

    console.error(err);
    done(err);

  });

});

module.exports = passport;
