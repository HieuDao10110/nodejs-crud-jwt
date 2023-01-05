const express = require("express");
const db = require("./models");
const bodyParser = require('body-parser')
const simpleData = require('./node/simpleData')

var indexRouter = require('./routes/index.js');
var userRouter = require('./routes/userRoutes.js');
var editorRouter = require('./routes/editorRoutes.js');
var managerRouter = require('./routes/managerRoutes.js');
var adminRouter = require('./routes/adminRoutes.js');

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/editor', editorRouter);
app.use('/manager', managerRouter);
app.use('/admin', adminRouter);

asyncDatabase = async (createData) => {

    await db.sequelize.sync()
        .then(() => {
            console.log("Synced db.");
        })
        .catch((err) => {
            console.log("Failed to sync db: " + err.message);
        });

    //tao data mau
    if(createData){
        await simpleData();
    }

}
asyncDatabase(false);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
