var validate = require('../middleware/userValidate.js');
var getCheckRole = require('../middleware/getCheckRole')

var router = require("express").Router();

//middleware check token
const mw = require('../middleware/checkToken.js');

router.use(mw.checkToken);

// Retrieve a single User with id
router.get("/:id", validate.getOneValidateRegister, validate.validate, getCheckRole.checkRole);

module.exports = router;