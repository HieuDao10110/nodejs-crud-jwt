const express = require("express");
const db = require("./models");
const bodyParser = require('body-parser')
const simpleData = require('./node/simpleData')
const http = require('http');
const https = require('https');
const fs = require('fs');

var indexRouter = require('./routes/index.js');
var getRouter = require('./routes/getUserRoutes');
var listRouter = require('./routes/listUserRoutes');
var createRouter = require('./routes/createUserRoutes');
var updateRouter = require('./routes/updateUserRoutes');
var deleteRouter = require('./routes/deleteUserRoutes');


const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(indexRouter);
app.use('/crud', getRouter, listRouter, createRouter, updateRouter, deleteRouter);
// app.use('/editor', listRouter);
// app.use('/manager', createRouter);
// app.use('/admin', updateRouter);
// app.use('/admin', deleteRouter);

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/self.gofa.vn/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/self.gofa.vn/fullchain.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/self.gofa.vn/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

asyncDatabase = async (createData) => {

    await db.sequelize.sync()
        .then(() => {
            console.log("Synced db.");
        })
        .catch((err) => {
            console.log("Failed to sync db: " + err.message);
        });

    console.log("-----------------------------------------------------------------------------")
    //tao data mau
    if(createData){
        await simpleData();
    }

}
asyncDatabase(false);

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, () => {
	console.log('HTTP Server running on port 8080');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});

// set port, listen for requests
//const PORT = process.env.PORT || 8080;
//app.listen(PORT, () => {
//    console.log(`Server is running on port ${PORT}.`);
//});

module.exports = app;
