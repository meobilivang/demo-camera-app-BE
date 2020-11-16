const mysql = require('mysql2');
const { DATABASE_CONFIG }  = require("../config/index");

//Connecting to MySQL DB
const connection = mysql.createConnection({
    host: DATABASE_CONFIG.HOST,
    user: DATABASE_CONFIG.USER,
    password: DATABASE_CONFIG.PASSWORD,
    database: DATABASE_CONFIG.DATABASE
})


connection.connect(error => {
    if (error)  {
        console.log("Connection Error: " + error);
    }
    else console.log("Success Connection to Database");
});

module.exports = connection;