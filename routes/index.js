var express = require('express');
var router = express.Router();
var checkLogin = require('../middleware/loginValidate.js');

const guest = require('../controllers/guestController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    return res.json({status: 'success', elements: 'Hello Wold!'})
});

/* LOGIN . */
router.post('/login', checkLogin , guest.login);

/* Register . */
router.post('/signup', checkLogin , guest.register);

/* Get new token when jwt expired . */
router.post('/token', guest.token)

module.exports = router;