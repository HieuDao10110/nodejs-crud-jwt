const userService = require("../services/userRepoService")
const userDto = require("../dto/resDto/userDto");
const jwt_decode = require("jwt-decode");
const Role = require("../enums/roles")
const bcrypt = require('bcrypt')


// Retrieve all User from the database.
exports.findAll = async (req, res) => {

    var page = parseInt(req.query.page);
    var quantity = parseInt(req.query.quantity);

    try {
        var result = await userService.findAllByRole(page, quantity, Role.USER);
        if(result === null){
            return res.status(200).json(result);
        }else{
            const listAcc = [];
            var x = 0;
            for(let i in result){
                var user = new userDto(result[i]);
                listAcc[x] = user;
                x++;
            }
            return res.status(200).json(listAcc);
        }

    } catch (e){
        return res.json({code: 'failed', message: 'Get user failed !!!'});
    }
};

// Find a single User with an id
exports.findOne = async (req, res) => {

    const id = req.params.id;
    try {
        var result = await userService.findOne(id, Role.USER);
        if(result === null){
            return res.status(200).json(result);
        }else{
            var user = new userDto(result);
            return res.status(200).json(user);
        }
    }catch (e){
        return res.json({code: 'failed', message: 'Get user failed !!!'});
    }
};

// Update a User by the id in the request
exports.update = async (req, res) => {

    const token = req.body.token || req.query.token || req.headers['x-access-token']

    var decoded = jwt_decode(token);

    const id = decoded.id;
    const {password, phoneNumber} = req.body;

    var hashPass = await bcrypt.hashSync(password, 5);

    try{
        var result = await userService.update(id, {password: hashPass, phoneNumber: phoneNumber}, Role.USER);
        return res.json({code: 'success', message: `${result} user updated!!!`});
    } catch (e) {
        return res.json({code: 'failed', message: 'Update user failed !!!'});
    }
};

