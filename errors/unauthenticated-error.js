const customAPIError = require("./custom-error");
const {StatusCodes} = require("http-status-codes");
class UnauthenticatedError extends customAPIError{
    constructor(message){
       super(message,StatusCodes.UNAUTHORIZED);
    }
}

module.exports = UnauthenticatedError;