var validate = require('../middleware/userValidate.js');
var deleteCheckRole = require('../middleware/deleteCheckRole')

var router = require("express").Router();

//middleware check token
const mw = require('../middleware/checkToken.js');

router.use(mw.checkToken);

router.delete("/:id", validate.deleteValidateRegister , validate.validate , deleteCheckRole.checkRole);

module.exports = router;