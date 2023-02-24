const jwt_decode = require("jwt-decode");
const db = require("../models");
const admin = require("../controllers/adminController");
const Users = db.users;
const Role = db.role;
const roleCode = require("../enums/roles")
const manager = require("../controllers/managerController");

exports.checkRole = async (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    var decoded = jwt_decode(token);

    var userid = await Users.findByPk(decoded.id, {include: Role});

    if(userid.role.id === roleCode.ADMIN){
        await admin.create(req, res);
    } else if(userid.role.id === roleCode.MANAGER){
        await manager.create(req, res)
    }
    else res.status(404).json({message: "not have permission!"});
}