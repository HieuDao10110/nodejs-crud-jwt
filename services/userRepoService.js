const db = require("../models");
const User = db.users;
var exception = require("../exception/customException.js")
const e = require("express");

// Create and Save a new User
exports.create = async (user) => {

    // Save User in the database
    try{
        var result = await User.create(user);
    }catch (e) {
        throw new exception(3);
    }

    return result;
};

// Retrieve all User from the database.
exports.findAll = () => {

    User.findAll()
        .then(data => {
            return data;
        })
        .catch(() => {
            throw new exception(3);
        });
};

// Retrieve some User from the database.
exports.findAllByRole = async (page, quantity, ...rolesId) => {
    var offset = (page - 1)*quantity;
    try {
        var result = await User.findAll({
            limit: quantity,
            offset: offset,
            where: {
                roleId: rolesId
            }
        });
    } catch (e){
        throw new exception(3);
    }
    return result;
};

// Find a single User with an roleId
exports.findOne = async (id, ...rolesId) => {

    try {
        var result = await User.findOne({
            where:{
                id: id,
                roleId: rolesId
            }
        });

    } catch (e) {
        throw new exception(3);
    }
    return result;
};

// Find a single User with a username
exports.findByUsername = async (user) => {
    try{
        var userA = await User.findOne({where : {username : user}})
    }catch (e){
        throw new exception(3);
    }
    return userA;
};

// Update a User by the id in the request
exports.update = async (id, user, ...rolesId) => {

    try{
        var num = await User.update(user, {
            where: {
                id: id,
                roleId: rolesId
            }
        });
    }catch (e){
        throw new exception(3);
    }
    return num;
};

// Delete a User with the specified id in the request
exports.delete = async (id, ...rolesId) => {

    try {
        var result = await User.destroy({
            where: {
                id: id,
                roleId: rolesId
            }
        });
    }catch (e) {
        throw new exception(3);
    }

    return result;
};

