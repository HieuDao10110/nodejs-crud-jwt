const {query, param, body, validationResult} = require('express-validator');

const createValidateRegister = [
    body("username").isEmail(),

    // /^
    // (?=.*\d)          // should contain at least one digit
    // (?=.*[a-z])       // should contain at least one lower case
    // (?=.*[A-Z])       // should contain at least one upper case
    // [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
    // $/
    body("password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    body("phoneNumber").exists()
];

var createValidate = (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

const updateValidateRegister = [
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

const getOneValidateRegister = [
    param("id").isInt({min:1})
];

var getOneValidate = (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

const getAllValidateRegister = [
    query("page").isInt({min:1}),
    query("quantity").isInt({min:1, max:10})
];

var getAllValidate = (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    createValidateRegister : createValidateRegister,
    createValidate : createValidate,
    updateValidateRegister: updateValidateRegister,
    updateValidate : updateValidate,
    getOneValidateRegister : getOneValidateRegister,
    getOneValidate : getOneValidate,
    getAllValidateRegister : getAllValidateRegister,
    getAllValidate : getAllValidate
}