const dbConnection = require('../db');
const sqlString = require('sqlstring');
const mysql = require('mysql2');

//user object for Authentication
const document = function (doc) {
    this.id = doc.id;
    this.user_name = doc.user_name;
    this.img_url = doc.img_url;
    this.doc_type_code = doc.doc_type_code;
    this.doc_type_name = doc.doc_type_name;
    this.upload_time = doc.upload_time
}

/** */
document.getList = (val, result) => {

    let sql = "SELECT * FROM document";
    dbConnection.query(sql, (error, data, field) => {
        if (error) {
            result(error, null);
            return;
        }
        //User found
        if (data.length) {
            result(null, data);
            return;
        }

        result({ message: "No document found!" }, null);
    });
}

/**
 * Testing
 * @param {} phoneNum 
 * @param {} result 
 */
document.getDocument = (phoneNum, result) => {
    let sql = sqlString.format("SELECT * FROM user WHERE `user_name`=?",
        [phoneNum]
    );
    dbConnection.query(sql, (error, data) => {
        if (error) {
            result(error, null);
            return;
        }
        if (data) {
            result(null, data);
            return;
        }

        result({ message: "No user found!" }, null);
    });
}

document.saveNewDocument = (newDocument, result) => {
    let sql = sqlString.format("INSERT INTO `document` SET ?"
    , newDocument);
    dbConnection.query(sql, (error, data, field) => {
        if (error) {
            result(error, null);
            return;
        }
        //On development -> returns all data of image
        result(null, newDocument );
    });
}

module.exports = document;