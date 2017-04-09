let express = require("express");
let path = require("path");
let router = express.Router();

const dist = "../../client/dist";

let sendIndex = (req, res) => {
	res.sendFile(path.join(__dirname, dist, "index.html"));
};

router.get("/", sendIndex);
router.get("/login", sendIndex);
router.get("/home", sendIndex);
router.get("/profile/:id", sendIndex);
router.get("/signup", sendIndex);

module.exports = router;