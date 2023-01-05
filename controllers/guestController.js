const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const _CONF = require("../config");
const userService = require("../services/userRepoService")
const Role = require("../enums/roles")
const bcrypt = require('bcrypt')



var signupDto = require("../dto/reqDto/signupDto")
const exception = require("../exception/customException");
const logger = require("../config/logger");

var refreshTokens = {} ;// tao mot object chua nhung refreshTokens

exports.login = async (req, res) => {

    var {username, password} = req.body;
    username = username.toLowerCase();

    try{
        var checkUser = await userService.findByUsername(username);
    }catch (e){
        return res.json({code: 'failed', message: 'login failed !!!'});
    }

    if(checkUser == null){
        return res.json({code: 'failed', message: 'invalid username !!!'});
    }

    var un = checkUser.username;
    var pw = checkUser.password;
    var uid = checkUser.id;

    var checkPassResult = bcrypt.compareSync(password, pw) ;

    if((username === un) && checkPassResult){
        let user = {
            id: uid
        }
        const token = jwt.sign(user, _CONF.SECRET, {expiresIn: _CONF.tokenLife});//60 giay
        const refreshToken = jwt.sign(user, _CONF.SECRET_REFRESH, {expiresIn: _CONF.refreshTokenLife});

        const response = {
            "status": "Logged in",
            "token": token,
            "refreshToken": refreshToken,
        }

        refreshTokens[refreshToken] = response;

        return res.json(response);
    }
    return res.json({status: 'failed', elements: 'Login failed!!!'});
}

exports.token = (req, res) => {
    // refresh the damn token
    const {refreshToken} = req.body

    // if refresh token exists
    // (xac thuc refresh token bang cach kiem tra xem refresh token co trong list refreshTokens hay khong)
    // hoac dung cache de luu tru refresh token, nhung refresh token het han se tu dong xoa khoi cache
    if(refreshToken && (refreshToken in refreshTokens)) {
        var decoded = jwt_decode(refreshToken);
        console.log(decoded);
        const user = {
            id: decoded.id,
        }
        const token = jwt.sign(user, _CONF.SECRET, { expiresIn: _CONF.tokenLife})
        const response = {
            "token": token,
        }
        // update the token in the list
        refreshTokens[refreshToken].token = token
        res.status(200).json(response);
    } else {
        res.status(404).send('Invalid request')
    }
}

exports.register = async (req, res) => {

    const {username, password} = req.body;

    var hashPass = await bcrypt.hashSync(password, 5);

    // create account with role: user
    const user = new signupDto(username.toLowerCase(), hashPass, Role.USER);

    var checkUser

    try{
        checkUser = await userService.findByUsername(username);
    }catch (e){
        return res.json({code: e.errorDescription.code, message: e.errorDescription.message});
    }

    if(checkUser){
        return res.json({code: 'failed', message: 'Username is existed !!!'});
    }else{
        try {
            var result = await userService.create(user);
            return res.json({code: 'success', message: 'Sign up success !!!'});
        }catch (e) {
            return res.json({code: 'failed', message: 'Create user failed !!!'});
        }
    }
}
