const db = require("../models");

const Privilege = db.privilege;
const Role = db.role;
const Users = db.users;

const bcrypt = require('bcrypt')


module.exports = async ()=>{
    await Privilege.bulkCreate([
        {
            id: 1,
            name: "CREATE"
        },
        {
            id: 2,
            name: "READ"
        },
        {
            id: 3,
            name: "UPDATE"
        },
        {
            id: 4,
            name: "DELETE"
        }]
    );

    await Role.bulkCreate([
        {
            id: 1,
            name: "ADMIN",
            index: 40
        },
        {
            id: 2,
            name: "MANAGER",
            index: 30
        },
        {
            id: 3,
            name: "EDITOR",
            index: 20
        },
        {
            id: 4,
            name: "USER",
            index: 10
        }
    ]);

    const adminRole = await Role.findByPk(1);
    const adminPrivilege = await Privilege.findAll({
        where: {
            id: [1, 2, 3, 4]
        }
    });
    adminRole.addPrivilege(adminPrivilege);

    const managerRole = await Role.findByPk(2);
    const managerPrivilege = await Privilege.findAll({
        where: {
            id: [1, 2, 3, 4]
        }
    });
    managerRole.addPrivilege(managerPrivilege);

    const editorRole = await Role.findByPk(2);
    const editorPrivilege = await Privilege.findAll({
        where: {
            id: [1, 2, 3]
        }
    });
    editorRole.addPrivilege(editorPrivilege);

    const userRole = await Role.findByPk(2);
    const userPrivilege = await Privilege.findAll({
        where: {
            id: [1, 2, 3]
        }
    });
    userRole.addPrivilege(userPrivilege);



    //tao account admin
    var pass = "Lumi1234"
    var hashPass;
    bcrypt.hash(pass, 5, function(err, hash) {
        hashPass = hash;
    });

    await Users.create({
        id: 1,
        username: 'admin@lumi.vn',
        password: hashPass,
        roleId: 1
    })

    //tao account manager
    await Users.create({
        id: 2,
        username: 'manager@lumi.vn',
        password: hashPass,
        roleId: 2
    })

    //tao account editor
    await Users.create({
        id: 3,
        username: 'editor@lumi.vn',
        password: hashPass,
        roleId: 3
    })

    //tao account  user
    await Users.create({
        id: 4,
        username: 'user@lumi.vn',
        password: hashPass,
        roleId: 4
    })

    // var a = await Users.findByPk(1, {include: Role});
    // console.log(a.role.name);
}