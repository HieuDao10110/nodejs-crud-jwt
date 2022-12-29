const manager = require("../controllers/managerController.js");
var validate = require('../middleware/userValidate.js');
var managerValidate = require('../middleware/managerValidate.js');
var checkRole = require('../middleware/checkRole')
const Role = require("../enums/roles")


var router = require("express").Router();

//middleware check token
const mw = require('../middleware/checkToken.js');
router.use(mw.checkToken);

//middleware check role
router.use(checkRole.checkRole( Role.MANAGER))

// Create a new User
router.post("/", validate.createValidateRegister , validate.createValidate , manager.create);

// Retrieve all Users
router.get("/", validate.getAllValidateRegister, validate.getAllValidate, manager.findAll);

// Retrieve a single User with id
router.get("/:id", validate.getOneValidateRegister, validate.getOneValidate, manager.findOne);

// Update a User with id
router.put("/", managerValidate.updateValidateRegister, managerValidate.updateValidate, manager.update);

// Delete a User with id
router.delete("/:id", managerValidate.deleteValidateRegister, managerValidate.deleteValidate, manager.delete);

module.exports = router;