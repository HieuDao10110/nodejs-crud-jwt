const editor = require("../controllers/editorController.js");
var validate = require('../middleware/userValidate.js');
var managerValidate = require('../middleware/managerValidate.js');
var checkRole = require('../middleware/checkRole')
const Role = require("../enums/roles")


var router = require("express").Router();

//middleware check token
const mw = require('../middleware/checkToken.js');
router.use(mw.checkToken);

//middleware check role
router.use(checkRole.checkRole( Role.EDITOR))

// Retrieve all Users
router.get("/", validate.getAllValidateRegister, validate.getAllValidate, editor.findAll);

// Retrieve a single User with id
router.get("/:id", validate.getOneValidateRegister, validate.getOneValidate, editor.findOne);

// Update a User with id
router.put("/", managerValidate.updateValidateRegister, managerValidate.updateValidate, editor.update);

module.exports = router;