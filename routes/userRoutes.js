const user = require("../controllers/userController.js");
var validate = require('../middleware/userValidate.js');
var checkRole = require('../middleware/checkRole')
const Role = require("../enums/roles")


var router = require("express").Router();

//middleware check token
const mw = require('../middleware/checkToken.js');
router.use(mw.checkToken);

//middleware check role
router.use(checkRole.checkRole( Role.USER))

// Retrieve all Users
router.get("/", validate.getAllValidateRegister, validate.getAllValidate, user.findAll);

// Retrieve a single User with id
router.get("/:id", validate.getOneValidateRegister, validate.getOneValidate, user.findOne);

// Update a User with id
router.put("/", validate.updateValidateRegister, validate.updateValidate, user.update);

module.exports = router;