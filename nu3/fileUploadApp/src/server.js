const express = require("express");
const app = express();
const db = require("./models");
require('dotenv').config();
const initRoutes = require("./routes/upload.routes");

db.sequelize.sync();
let token = null;


global.__basedir = __dirname + "/..";
app.use('/css', express.static(__dirname+  '/../node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.urlencoded({ extended: true }));

initRoutes(app);
require("./routes/main.routes")(app);


let port = process.env.PORT || 8080;
var server = app.listen(port, () => {
   console.log(`Running at localhost:${port}`);
});


module.exports = server