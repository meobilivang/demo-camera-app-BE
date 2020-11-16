const authService = require("../../service/userAuthService");
const { validationRes, successRes, errorRes } = require("./responseObject");
const { responseMessage, errorDescription } = require("../../config/const");

const userSignIn = async (req, res) => {
    let result = await authService.signInUser(req.body);
    //Error
    if (result.error) {
        if (result.error === errorDescription.invalidPhonePasswordInput 
            || result.error === errorDescription.incorrectPassword )
            res.status(422).json(validationRes(responseMessage.validationError, res.statusCode, result.error));
        
        else if (result.error === errorDescription.userNotFound)
            res.status(404).json(validationRes(responseMessage.validationError, res.statusCode, result.error));
        
        else res.status(500).json(validationRes(responseMessage.validationError, res.statusCode, { error: errorDescription.internalError }));
    }

    //Success Sign in
    else res.status(200)
        .json(validationRes(responseMessage.validationSuccess, res.statusCode, null, result.token));

};
const userSignUp = async (req, res) => {
    let result = await authService.signUpUser(req.body);
    //Error
    if (result.error) {
        if (result.error === errorDescription.invalidPhonePasswordInput)
            res.status(422).json(errorRes(responseMessage.signUpError, res.statusCode, result.error));
        
        else if (result.error === errorDescription.userAlreadyRegisterd)
            res.status(403).json(errorRes(responseMessage.signUpError, res.statusCode, result.error));
        
        else res.status(500).json(errorRes(responseMessage.signUpError, res.statusCode, { error: errorDescription.internalError }));
    }

    //Success Sign in
    else res.status(200).json(successRes(responseMessage.signUpSuccess, res.statusCode, result));
};


const userSignInSocialMedia = async (req, res) => {
    let result = await authService.signInSocialMedia(req.body);
    // //Error
    // if (result.error) {
    //     if (result.error === errorDescription.invalidPhonePasswordInput 
    //         || result.error === errorDescription.incorrectPassword )
    //         res.status(422).json(validationRes(responseMessage.validationError, res.statusCode, result.error));
        
    //     else if (result.error === errorDescription.userNotFound)
    //         res.status(404).json(validationRes(responseMessage.validationError, res.statusCode, result.error));
        
    //     else res.status(500).json(validationRes(responseMessage.validationError, res.statusCode, { error: errorDescription.internalError }));
    // }

    //Success Sign in
    res.status(200)
        .json(validationRes(responseMessage.validationSuccess, res.statusCode, null, result.token));

};

module.exports = {
    userSignIn, 
    userSignUp,
    userSignInSocialMedia,
};