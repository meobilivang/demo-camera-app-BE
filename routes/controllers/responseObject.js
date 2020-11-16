/**
 * 
 * MODELS FOR DIFFERENT CATERGORIES OF RESPONSES
 * 
 */

exports.successRes = (message, statusCode, data) => {
    return {
        message,
        error: null,
        status: parseInt(statusCode),
        data
    };
}

exports.errorRes = (message, statusCode, error) => { 
    return {
        message,
        error: error,
        status: parseInt(statusCode),
    }
}

exports.validationRes = (message, statusCode, errorValidation, token) => {
    return {
        message,
        error: errorValidation,
        status: parseInt(statusCode),
        token: token ? token : null
    };
}