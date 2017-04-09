const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const User = require('./models/user.model');

// For reference:
// https://github.com/passport/express-4.x-local-example/blob/master/server.js

passport.use(new Strategy((username, password, done) => {

	User.login(username, password).then(function(user) {
		console.log("")
		
		if (user) {
			done(null, user);
		} else { 
			done(null, false);	
		}
	}).catch(function(err) {
		console.error(err);
		done(err);
	});

}));

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {

	let user = User.findByUserId(id).then(function(user) {
		if (user) {
			done(null, user);
		} else {
			done({ errorMessage: "Invalid username or password." }, false);
		}		
	}).catch(function(err) {
		console.error(err);
		done(err);
	})
});

module.exports = passport;