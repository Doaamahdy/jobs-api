const BadRequest = require("./bad-request");
const customAPIError = require("./custom-error");
const {StatusCodes} = require("http-status-codes");

class NotFoundError extends customAPIError{
    constructor(message){
        super(message,StatusCodes.NOT_FOUND);
    }
}
module.exports = BadRequest;