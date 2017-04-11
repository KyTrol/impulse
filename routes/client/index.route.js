let express = require('express');
let path = require('path');
let router = express.Router();

const dist = '../../client/dist';

let sendIndex = (req, res) => {
  res.sendFile(path.join(__dirname, dist, 'index.html'));
};

router.get('/', sendIndex);
router.get('/home', sendIndex);
router.get('/home/login', sendIndex);
router.get('/home/signup', sendIndex);
router.get('/profile/:id', sendIndex);

module.exports = router;
