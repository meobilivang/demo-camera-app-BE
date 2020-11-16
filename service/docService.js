const document = require('../db/models/document')
const { errorDescription, documentType } = require("../config/const")

let saveNewDocumentToDb = (newDocument)=> {
    return new Promise(function(resolve, reject) {
        let query = document.saveNewDocument(newDocument, (error, data) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
};

let getDocList = () =>{
    return new Promise(function(resolve, reject) {
        let query = document.getList(null, (error, data) => {
            if (error) 
                reject(error);
            
            resolve(data);
        });
    });
};

let saveNewDocument = async (req) => {
    const { file, body, user } = req;
    const type = body.type;
    const phoneNum = user.phoneNum;

    //phone number not attached
    if (!phoneNum)
        return { error: errorDescription.userNotFound };

    //If no attached file / type
    if (!file) 
        return { error: errorDescription.noFile };
    if (!type)
        return { error: errorDescription.invalidDocumentType };

    const typeDocument = documentType[type];
    //Cant identify type of document
    if (!typeDocument)
        return { error: errorDescription.invalidDocumentType };

    const newDocument = {
        user_name: phoneNum,
        img_url: file.path,
        doc_type_name: type,
        doc_type_code: typeDocument
    }
    
    //Save to Database
    let savedDocument = await saveNewDocumentToDb(newDocument);

    //Error when saving to db
    if (savedDocument.error) 
        return savedDocument;
    //Success operation
    else return savedDocument;
};



module.exports={
    getDocList,
    saveNewDocument
}