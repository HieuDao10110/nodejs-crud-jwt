const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    const Privilege = sequelize.define("Privilege", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    });

    return Privilege;
};