var validate = require('../middleware/userValidate.js');
var listCheckRole = require('../middleware/listCheckRole')

var router = require("express").Router();

//middleware check token
const mw = require('../middleware/checkToken.js');

router.use(mw.checkToken);

// Retrieve all Users
router.get("/", validate.getAllValidateRegister, validate.validate, listCheckRole.checkRole);

module.exports = router;