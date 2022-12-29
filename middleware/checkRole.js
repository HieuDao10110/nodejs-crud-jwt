const jwt_decode = require("jwt-decode");
const db = require("../models");
const Users = db.users;
const Role = db.role;

exports.checkRole = (...rolesId) => {
    return async (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers['x-access-token']

        var decoded = jwt_decode(token);

        var user = await Users.findByPk(decoded.id, {include: Role});

        if(rolesId.includes(user.role.id)){
            next();
        }else res.status(404).json({message: "not have permission!"});
    }

}