const path = require('path')

var root = path.dirname(__dirname);

require('dotenv').config({ path: path.join(root, '.env') })

module.exports = {
    HOST: process.env.SQ_HOST,
    USER: process.env.SQ_USER,
    PASSWORD: process.env.SQ_PASSWORD,
    DB: process.env.SQ_DB,
    dialect: process.env.SQ_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};



