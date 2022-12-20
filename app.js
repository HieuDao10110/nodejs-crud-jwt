const express = require("express");
// const cors = require("cors");
const app = express();
const bodyParser = require('body-parser')

var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/userDetailRoutes.js');

// var corsOptions = {
//     origin: "http://localhost:8081"
// };
//
// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const db = require("./models");

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
