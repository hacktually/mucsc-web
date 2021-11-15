var mysql       = require("mysql");
var dbconfig    = require("../config/conn");
var connection  = mysql.createConnection(dbconfig.connection);
const env       = require('dotenv')
env.config();

connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        connection.query('USE '+ dbconfig.database);
        console.log('connection');
    }
});

module.exports = {
    connection: connection
};
