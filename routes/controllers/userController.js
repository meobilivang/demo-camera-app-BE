// const userBasic = require("../../db/models/userBasic");
const userManagerService = require("../../service/userManagerService");
const { successRes, errorRes } = require("../controllers/responseObject");
const { responseMessage } = require("../../config/const");

let getUserList = (req, res) => {
    let userList = userManagerService.findAllUsers().then((data) => {
        if (data.length != 0) {
            res.status(200)
                .json(successRes(responseMessage.userList, res.statusCode, data));
        } else res.status(404)
                .json(errorRes(responseMessage.userListEmpty, res.statusCode, error.error));
    }).catch(error => {
        res.status(500)
            .json(errorRes(responseMessage.userListEmpty, res.statusCode, error.error));
    });
};

let getUserByPhone = (req, res) => {
    const { phoneNum } = req.params;
    userManagerService.getUser(phoneNum).then((data) => {
        res.status(200)
                .json(successRes(responseMessage.userFound, res.statusCode, data));
    }).catch( error => {
        res.status(500)
            .json(errorRes(responseMessage.userCanNotFind, res.statusCode, error.error));
    });
};

module.exports = {
    getUserList,
    getUserByPhone
};