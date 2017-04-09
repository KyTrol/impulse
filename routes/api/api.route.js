let express = require("express");
let router = express.Router();

let userRouteCreator = require("./user.route.js");

module.exports = (passport) => {
	router.use("/user", userRouteCreator(passport));

	return router;
};