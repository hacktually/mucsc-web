var mysql       = require("mysql");
var dbconfig    = require("../config/conn");
var connection  = mysql.createConnection(dbconfig.connection);
const env         = require('dotenv')
env.config();

connection.connect((err) => {
    if (err) {
        console.log(process.env.DB_USER)
        throw err;
    } else {
        console.log('connection');
    }
})
module.exports = {
    connection: connection
};