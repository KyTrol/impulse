let express = require("express");
let router = express.Router();
const UserController = require("../../controllers/user.controller.js");

module.exports = (passport) => {

	let controller = new UserController();

	router.post("/login",
		passport.authenticate("local"),
		controller.login
	);

	router.get("/logout",
		controller.logout
	);

	router.post("/auth",
		isLoggedIn,
		controller.login
	);

	router.post("/signup",
		controller.signup
	);
	
	router.post("/test", function(req, res, err) {
		res.send("It works.");
	});

	return router;
};

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(401);
	}

}