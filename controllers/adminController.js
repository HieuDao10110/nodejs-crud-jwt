const userService = require("../services/userRepoService")
const userDto = require("../dto/resDto/userDto");
const Role = require("../enums/roles")
const bcrypt = require("bcrypt");

// Create and Save a new User
exports.create = async (req, res) => {

    var roleId;
    switch (req.body.role){
        case "ADMIN" :
            roleId = Role.ADMIN;
            break;
        case "MANAGER" :
            roleId = Role.MANAGER;
            break;
        case "EDITOR":
            roleId = Role.EDITOR;
            break;
        case "USER":
            roleId = Role.USER;
            break;
        default: roleId = Role.USER;
    }


    var password = req.body.password;

    var hashPass = await bcrypt.hashSync(password, 5);

    // Create a User
    const user = {
        username: req.body.username.toLowerCase(),
        password: hashPass,
        phoneNumber: req.body.phoneNumber,
        roleId: roleId
    };

    try{
        var checkUser = await userService.findByUsername(user.username);
    }catch (e){
        return res.json({code: e.errorDescription.code, message: e.errorDescription.message});
    }

    if(checkUser){
        return res.json({code: 'failed', message: 'Username is existed !!!'});
    }else{
        try {
            await userService.create(user);
            return res.json({code: 'success', message: 'Create user success !!!'});
        }catch (e) {
            return res.json({code: 'failed', message: 'Create user failed !!!'});
        }
    }
};

// Retrieve all User from the database.
exports.findAll = async (req, res) => {

    var page = parseInt(req.query.page);
    var quantity = parseInt(req.query.quantity);

    try {
        var result = await userService.findAllByRole(page, quantity, Role.USER, Role.EDITOR, Role.MANAGER, Role.ADMIN);

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
        var result = await userService.findOne(id, Role.USER, Role.EDITOR, Role.MANAGER, Role.ADMIN);
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

    const {id, password, phoneNumber} = req.body;

    var hashPass = await bcrypt.hashSync(password, 5);

    try{
        var result = await userService.update(id, {password: hashPass, phoneNumber: phoneNumber}, Role.USER, Role.EDITOR, Role.MANAGER, Role.ADMIN);
        return res.json({code: 'success', message: `${result} user updated!!!`});
    } catch (e) {
        return res.json({code: 'failed', message: 'Update user failed !!!'});
    }
};

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {

    const id = req.params.id;

    try {
        var result = await userService.delete(id, Role.USER, Role.EDITOR, Role.MANAGER, Role.ADMIN);
        return res.json({code: 'success', message: `${result} user deleted!!!`});
    } catch (e){
        return res.json({code: 'failed', message: 'Delete user failed !!!'});
    }
};

