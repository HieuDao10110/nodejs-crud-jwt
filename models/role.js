const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const Role = sequelize.define("role", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        index: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        }
    });

    return Role;
};