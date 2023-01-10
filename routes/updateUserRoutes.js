var validate = require('../middleware/userValidate.js');
var updateCheckRole = require('../middleware/updateCheckRole')

var router = require("express").Router();

//middleware check token
const mw = require('../middleware/checkToken.js');

router.use(mw.checkToken);

router.put("/", validate.updateValidateRegister, validate.validate , updateCheckRole.checkRole);

module.exports = router;