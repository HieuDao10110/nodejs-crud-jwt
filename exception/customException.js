var errorMap = require('./errorMapping.json');

module.exports = class CustomException extends Error{
    constructor(code){
        super(errorMap[code]);
        let errorDescription  = {};
        errorDescription.message = errorMap[code];
        errorDescription.code = code;
        this.errorDescription = errorDescription;
    }
}