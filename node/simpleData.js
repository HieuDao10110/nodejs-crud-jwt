const db = require("../models");

const Privilege = db.privilege;
const Role = db.role;
const Users = db.users;

const bcrypt = require('bcrypt')
const Logger = require("../config/logger");


module.exports = async ()=>{
    try{
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
        ).then(function (a){
            console.log("Created simple Privilege data")
        }).catch(function (e){
            Logger.error('Create simple Privilege fail')
        });

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
        ]).then(function (a){
            console.log("Created simple Role data")
        }).catch(function (e){
            Logger.error('Create simple Role fail')
        });


        await Role.findByPk(1).then(async (adminRole) => {
            if(!adminRole){
                console.log("role1 not found");
                return null;
            }
            await Privilege.findAll({
                where: {
                    id: [1, 2, 3, 4]
                }
            }).then((adminPrivilege) => {
                if(!adminPrivilege){
                    console.log("privilege1 not found");
                    return null;
                }

                try {
                    adminRole.addPrivilege(adminPrivilege);
                    console.log('>> added adminRole success');
                    return true;
                }catch (e){
                    console.log(e);
                }
            }).catch((e) => {
                console.log(e);
            });
        }).catch((e) => {
            console.log(e);
        });

        await Role.findByPk(2).then(async (managerRole) => {
            if(!managerRole){
                console.log("role2 not found");
                return null;
            }
            await Privilege.findAll({
                where: {
                    id: [1, 2, 3, 4]
                }
            }).then((managerPrivilege) => {
                if(!managerPrivilege){
                    console.log("privilege2 not found");
                    return null;
                }

                try {
                    managerRole.addPrivilege(managerPrivilege);
                    console.log('>> added managerRole success');
                    return true;
                }catch (e){
                    console.log(e);
                }
            }).catch((e) => {
                console.log(e);
            });
        }).catch((e) => {
            console.log(e);
        });

        await Role.findByPk(3).then(async (editorRole) => {
            if(!editorRole){
                console.log("role3 not found");
                return null;
            }
            await Privilege.findAll({
                where: {
                    id: [2, 3]
                }
            }).then((editorPrivilege) => {
                if(!editorPrivilege){
                    console.log("privilege3 not found");
                    return null;
                }

                try {
                    editorRole.addPrivilege(editorPrivilege);
                    console.log('>> added editorRole success');
                    return true;
                }catch (e){
                    console.log(e);
                }
            }).catch((e) => {
                console.log(e);
            });
        }).catch((e) => {
            console.log(e);
        });

        await Role.findByPk(4).then(async (userRole) => {
            if(!userRole){
                console.log("role4 not found");
                return null;
            }
            await Privilege.findAll({
                where: {
                    id: [2, 3]
                }
            }).then((userPrivilege) => {
                if(!userPrivilege){
                    console.log("privilege4 not found");
                    return null;
                }

                try {
                    userRole.addPrivilege(userPrivilege);
                    console.log('>> added userRole success');
                    return true;
                }catch (e){
                    console.log(e);
                }
            }).catch((e) => {
                console.log(e);
            });
        }).catch((e) => {
            console.log(e);
        });

        //tao account admin
        var pass = "Lumi1234"
        var hashPass = bcrypt.hashSync(pass, 5)

        await Users.create({
            id: 1,
            username: 'admin@lumi.vn',
            password: hashPass,
            roleId: 1
        }).then(function (a){
            console.log("Created ADMIN")
        }).catch(function (e){
            Logger.error('Create simple User1 fail')
        });

        //tao account manager
        await Users.create({
            id: 2,
            username: 'manager@lumi.vn',
            password: hashPass,
            roleId: 2
        }).then(function (a){
            console.log("Created MANAGER")
        }).catch(function (e){
            Logger.error('Create simple User2 fail')
        });

        //tao account editor
        await Users.create({
            id: 3,
            username: 'editor@lumi.vn',
            password: hashPass,
            roleId: 3
        }).then(function (a){
            console.log("Created EDITOR")
        }).catch(function (e){
            Logger.error('Create simple User3 fail')
        });

        //tao account  user
        await Users.create({
            id: 4,
            username: 'user@lumi.vn',
            password: hashPass,
            roleId: 4
        }).then(function (a){
            console.log("Created USER")
        }).catch(function (e){
            Logger.error('Create simple User4 fail')
        });

        // var a = await Users.findByPk(1, {include: Role});
        // console.log(a.role.name);

    }catch (e) {
        Logger.error("Creat simple data fail")
    }
}