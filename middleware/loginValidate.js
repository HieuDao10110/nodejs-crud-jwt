var CustomError = require('../exception/customException.js');

var validate = (req,res,next)=>{
    if(req.body.username == null || req.body.username === ""){
        let error = new CustomError(1);
        return res.status(400).send(error);
    }else if(req.body.password == null || req.body.password === ""){
        let error = new CustomError(2);
        return res.status(400).send(error);
    }
    next();
}

module.exports = validate;