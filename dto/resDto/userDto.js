module.exports = class userDto {
    constructor(user){
        this.username = user.dataValues.username;
        this.phone = user.dataValues.phoneNumber;
        this.role = user.dataValues.roleId;
    }
}