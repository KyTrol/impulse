module.exports = (passport) => {
	return {
		api: require("./api/api.route.js")(passport),
		client: require("./client/index.route.js")
	};
};