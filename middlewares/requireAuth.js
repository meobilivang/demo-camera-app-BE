const jwt = require("jsonwebtoken");
const { errorDescription, responseMessage, tokenSigning } = require("../config/const");
const { errorRes } = require("../routes/controllers/responseObject");
const { findUserByPhoneNum } = require("../service/userAuthService");

//Middlewares for checking token
let requireAuth = (req, res, next) => {
    //Retrieve the Authorization from header
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(401).json(errorRes(responseMessage.notAuthenticated, res.statusCode, errorDescription.notAuthenticated ));
    
    //Retrieve token
    const retrievedToken = authorization.replace('Bearer', '');
    //Validate token
    jwt.verify(retrievedToken, tokenSigning.signingString , async(error, payload) => {
        //Invalid token
        if (error)
            return res.status(401).json(errorRes(responseMessage.notAuthenticated, res.statusCode, { error: errorDescription.notAuthenticated } ));
        
        //Get data by decryped token
        const { id, phoneNum } = payload;

        //Find user
        const validUser = await findUserByPhoneNum(phoneNum);

        //Attach user Object to request
        req.user = {
            id: validUser.id,
            phoneNum: validUser.user_name,
        };
        
        next();
    }); 
    
}

module.exports = requireAuth;
