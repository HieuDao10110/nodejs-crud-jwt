const jwt_decode = require("jwt-decode");
const db = require("../models");
const admin = require("../controllers/adminController");
const Users = db.users;
const Role = db.role;
const roleCode = require("../enums/roles")
const manager = require("../controllers/managerController");
const editor = require("../controllers/editorController");
const user = require("../controllers/userController");

exports.checkRole = async (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    var decoded = jwt_decode(token);

    var userId = await Users.findByPk(decoded.id, {include: Role});

    if(userId.role.id === roleCode.ADMIN){
        await admin.findAll(req, res);
    } else if(userId.role.id === roleCode.MANAGER){
        await manager.findAll(req, res)
    } else if(userId.role.id === roleCode.EDITOR){
        await editor.findAll(req, res)
    } else if(userId.role.id === roleCode.USER) {
        await user.findAll(req, res)
    }
    else res.status(404).json({message: "not have permission!"});
}