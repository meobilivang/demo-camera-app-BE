const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userBasic = require('../db/models/userBasic');
const { errorDescription, tokenSigning } = require("../config/const");

let findUserByPhoneNum = async (phoneNum) => { 
    return new Promise(function(resolve, reject) {
        userBasic.findByPhoneNum(phoneNum, (error, data) => {
            if (error) 
                resolve(error);
            else resolve(data);
        })
    });
}

//Create new user in DB
let createNewUser = async(newUser) => {
    return new Promise((resolve, reject) => {
        userBasic.createNewUser(newUser, (error, data) => {
            if (error)
                reject(error);
            resolve(data);
        });
    });
}

let comparePassword = async(inputPassword, truePassword) => {
    return bcrypt.compare(inputPassword, truePassword);
};

let hashPassword = async(inputPassword) => {
    return bcrypt.hash(inputPassword, 10);
};


let signInUser = async (body) => {
    const { phoneNum, password } = body;
    
    //If phone number / password not available
    if (!phoneNum || !password)
        return { error: errorDescription.invalidPhonePasswordInput };

    let foundUser = await findUserByPhoneNum(phoneNum);
    //Error // cant find user
    if (foundUser.error)
        return foundUser;

    //Init a user object
    let logInUser = new userBasic(foundUser);

    //Validate password
    let isCorrectPassword = await comparePassword(password, logInUser.password);

    //Incorrect password
    if (!isCorrectPassword) 
        return { error: errorDescription.incorrectPassword };
    
    //userId + user_name is signed with token
    const token = jwt.sign({ id: logInUser.id, phoneNum: logInUser.user_name }, tokenSigning.signingString );

    return { token };
};

let signUpUser = async (body) => {
    const { phoneNum, password } = body;
     //If phone number / password not available
     if (!phoneNum || !password)
        return { error: errorDescription.invalidPhonePasswordInput };

    let foundUser = await findUserByPhoneNum(phoneNum);
    
    //Error exist
    if (foundUser.error) {
        //User not exist -> can register user
        if (foundUser.error === errorDescription.userNotFound) {
            let hashedPassword = await hashPassword(password);
            let newUser = new userBasic({ 
                    user_name: phoneNum,
                    password: hashedPassword  
            });
            //INSERT new user into Database
            let registeredUser = await createNewUser(newUser);
            
            //Error when INSERT new User to DB
            if (registeredUser.error) 
                return registeredUser.error;
            
            //Success registration
            return registeredUser;  

            //Other errors
        } else return foundUser;
        //User already exists
    } else return { error: errorDescription.userAlreadyRegisterd };
};


//Testing Authentication with Fb / Gmail
let signInSocialMedia = async (body) => {
    const { username } = body;

    let foundUser = await findUserByPhoneNum(username);
    let tokenUserDataObj;
    //Register new user
    if (foundUser.error === errorDescription.userNotFound) {
        let newUserSocialMedia = await createNewUser(
            new userBasic({ 
                user_name: username,
            })
        );
        tokenUserDataObj = newUserSocialMedia;
    } else tokenUserDataObj = foundUser;
    
    //userId + user_name is signed with token
    const token = jwt.sign({ id: tokenUserDataObj.id, phoneNum: tokenUserDataObj.user_name }, tokenSigning.signingString );

    return { token };
};


module.exports = {
    signInUser,
    signInSocialMedia,
    signUpUser,
    findUserByPhoneNum,
}