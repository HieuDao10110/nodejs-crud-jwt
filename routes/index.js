var express = require('express');
var router = express.Router();

const guest = require('../controllers/guestController.js');

var refreshTokens = {} ;// tao mot object chua nhung refreshTokens

/* GET home page. */
router.get('/', function(req, res, next) {
    return res.json({status: 'success', elements: 'Hello Wold!'})
});

/* LOGIN . */
router.post('/login', guest.login);

/* Get new token when jwt expired . */
router.post('/token', guest.token)

module.exports = router;