const {body, validationResult, param} = require("express-validator");

const updateValidateRegister = [
    body("id").notEmpty().isInt({min: 1}),
    // /^
    // (?=.*\d)          // should contain at least one digit
    // (?=.*[a-z])       // should contain at least one lower case
    // (?=.*[A-Z])       // should contain at least one upper case
    // [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
    // $/
    body("password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    body("phoneNumber").exists()
];

var updateValidate = (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

const deleteValidateRegister = [
    param("id").isInt({min:1})
];

var deleteValidate = (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    updateValidateRegister: updateValidateRegister,
    updateValidate : updateValidate,
    deleteValidateRegister: deleteValidateRegister,
    deleteValidate : deleteValidate
}