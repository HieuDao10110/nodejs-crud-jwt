var validate = require('../middleware/userValidate.js');
var createCheckRole = require('../middleware/createCheckRole')

var router = require("express").Router();

//middleware check token
const mw = require('../middleware/checkToken.js');

router.use(mw.checkToken);

router.post("/", validate.createValidateRegister , validate.validate , createCheckRole.checkRole);

module.exports = router;