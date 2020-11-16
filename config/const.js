const responseMessage = {};

//COMMON PROJECT MESSAGES
responseMessage.notAuthenticated = "Not yet Authenticated";

//AUTHENTICATION
//Validation messages
responseMessage.validationSuccess = "Logged in";
responseMessage.validationError = "Can't log in";

//Success messages
responseMessage.signUpSuccess = "Signed Up!";

//Error message
responseMessage.signUpError = "Can't Sign Up";


//USER MANAGER

//Error
responseMessage.userCanNotFind = "Can't find User";
responseMessage.userListEmpty = "User List Empty";


//Success
responseMessage.userList = "User List";
responseMessage.userFound = "User Found!";


//DOCUMENT UPLOAD

//Success
responseMessage.uploadsuccess = "Uploaded successfully";


//Error
responseMessage.unableToUpload = "Unable To Upload Image";
responseMessage.noFile = "Can't leave file upload empty";
responseMessage.invalidDocumentType = "This document type can't be identified";

const errorDescription = {};

//Common Project Errors
errorDescription.internalError = "Some Error occured !";
errorDescription.userNotFound = "User Not Found !";
errorDescription.notAuthenticated = "Must Be Authenticated To Access";

//USER AUTHENTICATION

//Common SignIn +  SignUp errors
errorDescription.invalidPhonePasswordInput = "Invalid number or password input";

//SignIn errors
errorDescription.incorrectPassword = "Incorrect Password";

//Sign up error
errorDescription.userAlreadyRegisterd = "User already registered";


//USER MANAGER



//DOCUMENT UPLOAD

errorDescription.noFile = "No file received";
errorDescription.invalidDocumentType = "Invalid Document Type";




const tokenSigning = {};
tokenSigning.signingString = "SECRET_KEY";

//DOCUMENT TYPES
const documentType = {};
documentType["CMT"] = 1;
documentType["CCCD"] = 2;

module.exports = {
    responseMessage,
    errorDescription,
    tokenSigning,
    documentType,
}