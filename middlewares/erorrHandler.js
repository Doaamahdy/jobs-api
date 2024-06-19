const {StatusCodes} = require("http-status-codes");
const {CustomAPIError} = require('../errors/index') 

const errorHandlerMiddleware = (err,req,res,next)=>{
    let customError = {
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message||'Something went wrong try again later',

    }
   
    if(err.name && err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors)
        .map((item)=>item.message)
        .join(' , ');
        customError.statusCode = 400;
    }
    if(err.name && err.name === 'CastError'){
        customError.msg = `No Item found with id ${err.value}`;
        customError.statusCode = 404;
    }

    if(err.code && err.code == 11000){
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        customError.statusCode = 400;
    }
    
    return res.status(customError.statusCode).json({msg: customError.msg});

}
module.exports = errorHandlerMiddleware;