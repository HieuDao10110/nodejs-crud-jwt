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

        const adminRole = await Role.findByPk(1);
        const adminPrivilege = await Privilege.findAll({
            where: {
                id: [1, 2, 3, 4]
            }
        });

//TODO: check code below. validation error
        adminRole.addPrivilege(adminPrivilege, {foreignKey:{unique: false}}).then(function (a){
            console.log("ADMIN added Privilege")
        }).catch(function (e){
            console.log('ADMIN add Privilege fail')
            Logger.error(e)
        });

        const managerRole = await Role.findByPk(2);
        const managerPrivilege = await Privilege.findAll({
            where: {
                id: [1, 2, 3, 4]
            }
        });
        //TODO: check code below
        managerRole.addPrivilege(managerPrivilege, {foreignKey:{unique: false}}).then(function (a){
            console.log("MANAGER added Privilege")
        }).catch(function (e){
            console.log('MANAGER add Privilege fail')
            Logger.error(e)
        });

        const editorRole = await Role.findByPk(2);
        const editorPrivilege = await Privilege.findAll({
            where: {
                id: [1, 2, 3]
            }
        });
        //TODO: check code below
        editorRole.addPrivilege(editorPrivilege, {foreignKey:{unique: false}}).then(function (a){
            console.log("EDITOR added Privilege")
        }).catch(function (e){
            console.log('EDITOR add Privilege fail')
            Logger.error(e)
        });

        const userRole = await Role.findByPk(2);
        const userPrivilege = await Privilege.findAll({
            where: {
                id: [1, 2, 3]
            }
        });
        //TODO: check code below
        userRole.addPrivilege(userPrivilege, {foreignKey:{unique: false}}).then(function (a){
            console.log("USER added Privilege")
        }).catch(function (e){
            console.log('USER add Privilege fail')
            Logger.error(e)
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