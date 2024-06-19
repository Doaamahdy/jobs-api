const CustomAPIError = require("./custom-error");
const BadRequestError = require("./bad-request");
const UnauthenticatedError = require("./unauthenticated-error");
const NotFounError = require("./notFound-error");



module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
    NotFounError
}