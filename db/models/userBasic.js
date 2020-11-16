const dbConnection = require('../db');
const sqlString = require('sqlstring');
const mysql = require('mysql2');
const { errorDescription } = require("../../config/const");

//user object for Authentication
const userBasic = function (customer) {
    this.id = customer.id;
    this.user_name = customer.user_name;
    this.password = customer.password;
};

/** */
userBasic.getList = (val, result) => {

    let sql = "SELECT * FROM user";
    dbConnection.query(sql, (error, data, field) => {
        if (error) {
            result(error, null);
            return;
        }
        //User found
        if (data.length != 0) {
            result(null, data);
            return;
        }

        result({ error: errorDescription.userNotFound }, null);
    });
}

/**
 * Testing
 * @param {} phoneNum 
 * @param {} result 
 */
userBasic.getUser = (phoneNum, result) => {
    let sql = sqlString.format("SELECT * FROM user WHERE `user_name`=?",
        [phoneNum]
    );
    dbConnection.query(sql, (error, data) => {
        if (error) {
            result(error, null);
            return;
        }

        if (data.length != 0) {
            result(null, data[0]);
            return;
        }

        result({ error: errorDescription.userNotFound }, null);
    });
}

userBasic.createNewUser = (newUser, result) => {
    let sql = sqlString.format("INSERT INTO `user` SET ?", newUser);
    dbConnection.query(sql, (error, data) => {
        if (error) {
            result(error, null);
            return;
        }  
        result(null, { phoneNum: newUser.user_name });
    });
}

userBasic.findByPhoneNum = (phoneNum, result) => {
    let sql = sqlString.format("SELECT `id`,`user_name`,`password` FROM user WHERE `user_name`=?",
        [phoneNum]);
    dbConnection.execute(sql, (error, data) => {
        //Error
        if (error) {
            result(error, null);
            return;
        }

        //User found
        if (data.length != 0) {
            result(null, data[0]);
            return;
        }
        //Cant find the user
        result({ error: errorDescription.userNotFound }, null);
    });

}

module.exports = userBasic;