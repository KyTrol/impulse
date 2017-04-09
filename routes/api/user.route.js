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
		isLoggedIn,
		controller.logout
	);

	router.post("/auth",
		isLoggedIn,
		controller.login
	);

	router.post("/signup",
		controller.signup
	);
	
	router.post('/update',
		controller.updateInfo
	);
	
	router.get("/:username",
		isLoggedIn,
		controller.getUser
	);

	return router;
};

function isLoggedIn(req, res, next) {
	
	console.log("Checking if logged in.");
	console.log("Is logged in:", req.isAuthenticated());
	
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.sendStatus(401);
	}

}