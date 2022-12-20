const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const _CONF = require("../config");

const user = require("./userController.js");

var refreshTokens = {} ;// tao mot object chua nhung refreshTokens

exports.login = async (req, res) => {
    const {username, password} = req.body;
    if(!username){
        return res.json({status: 'failed', elements: 'Username is null!!!'});
    }

    var checkUser = await user.findByUsername(username);
    var un = checkUser.username;
    var pw = checkUser.password;



    if(username === un && password === pw && un != null && pw != null){
        let user = {
            username: un,
            role: "user"
        }
        const token = jwt.sign(user, _CONF.SECRET, {expiresIn: _CONF.tokenLife});//20 giay
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
    if(refreshToken && (refreshToken in refreshTokens)) {
        var decoded = jwt_decode(refreshToken);
        console.log(decoded);
        const user = {
            username: decoded.username,
            role: "user"
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
