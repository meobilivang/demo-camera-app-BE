const userDb = require('../db/models/userBasic'); 

let findAllUsers =  () => {
    return new Promise(function(resolve, reject) {
        let query = userDb.getList(null, (error, data) => {
            if (error) 
                reject(error);
            resolve(data);
        });
    });
}

let getUser = (phoneNum)=>{
    return new Promise(function(resolve, reject) {
        let query = userDb.getUser(phoneNum, (error, data) => {
            if (error)
                reject(error);
            resolve(data);
        });
    });
}

module.exports = {
    findAllUsers,
    getUser
}