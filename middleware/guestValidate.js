const {body, validationResult} = require('express-validator');

const loginValidateRegister = [
    body("username").isEmail(),

    // /^
    // (?=.*\d)          // should contain at least one digit
    // (?=.*[a-z])       // should contain at least one lower case
    // (?=.*[A-Z])       // should contain at least one upper case
    // [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
    // $/
    body("password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
];

var validateLogin = (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

const signupValidateRegister = [
    body("username").isEmail(),

    // /^
    // (?=.*\d)          // should contain at least one digit
    // (?=.*[a-z])       // should contain at least one lower case
    // (?=.*[A-Z])       // should contain at least one upper case
    // [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
    // $/
    body("password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    body("re-password").custom((value, { req }) => value === req.body.password)
];

var validateSignup = (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    loginValidateRegister : loginValidateRegister,
    validateLogin : validateLogin,
    signupValidateRegister : signupValidateRegister,
    validateSignup : validateSignup
};