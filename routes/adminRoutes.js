const admin = require("../controllers/adminController.js");
var validate = require('../middleware/userValidate.js');
var adminValidate = require('../middleware/adminValidate.js');
var checkRole = require('../middleware/checkRole')
const Role = require("../enums/roles")


var router = require("express").Router();

//middleware check token
const mw = require('../middleware/checkToken.js');
router.use(mw.checkToken);

//middleware check role
router.use(checkRole.checkRole( Role.ADMIN))

// Create a new User
router.post("/", adminValidate.createValidateRegister , adminValidate.createValidate , admin.create);

// Retrieve all Users
router.get("/", validate.getAllValidateRegister, validate.getAllValidate, admin.findAll);

// Retrieve a single User with id
router.get("/:id", validate.getOneValidateRegister, validate.getOneValidate, admin.findOne);

// Update a User with id
router.put("/", adminValidate.updateValidateRegister, adminValidate.updateValidate, admin.update);

// Delete a User with id
router.delete("/:id", adminValidate.deleteValidateRegister, adminValidate.deleteValidate, admin.delete);

module.exports = router;