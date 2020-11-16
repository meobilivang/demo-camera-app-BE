const docService = require('../../service/docService');
const { responseMessage, errorDescription } = require("../../config/const");
const { successRes, errorRes } = require("./responseObject"); 

let getDocList = (req, res) => {
    let userList = docService.getDocList().then((data) => {
        if (data) {
            res.status(200).send(data);
        }
    }).catch(err => {
        res.status(500).json(errorRes(responseMessage.unableToUpload, res.statusCode, { error: errorDescription.internalError }));
    });
};


let saveNewDocument = async (req, res)=> {
    let result = await docService.saveNewDocument(req);
    //If error
    if (result.error) {
        console.log(result.error);
        if (result.error === errorDescription.noFile) 
            res.status(422).json(errorRes(responseMessage.noFile, res.statusCode, result.error))
        
        else if (result.error === errorDescription.invalidDocumentType)
            res.status(422).json(errorRes(responseMessage.invalidDocumentType, res.statusCode, result.error))
        
        else if (result.error === errorDescription.userNotFound)
            res.status(404).json(errorRes(responseMessage.userCanNotFind, res.statusCode, result.error));
        
        else res.status(500).json(errorRes(responseMessage.unableToUpload, res.statusCode, { error: errorDescription.internalError }))
    }
    //Success
    else res.status(200).json(successRes(responseMessage.uploadsuccess, res.statusCode, result));
}

module.exports={
    getDocList,
    saveNewDocument
}