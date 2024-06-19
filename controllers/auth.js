const User = require("../models/user");
const {StatusCodes} = require("http-status-codes")
const {BadRequestError,UnauthenticatedError} = require("../errors/index");
require("dotenv").config();
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
  const newUser = await User.create({...req.body});
  const token = newUser.createJWT();
  res.status(StatusCodes.CREATED).json({user:{name:newUser.name},token});
};

const login = async (req, res) => {
  const {email,password} = req.body;

  if(!email || !password){
    throw new BadRequestError("Please Provide Email and Password");
  }

  const foundUser = await User.findOne({email});

  if(!foundUser){
     throw new UnauthenticatedError("Invalid Credintials");
  }

  const isPasswordCorrect = await foundUser.comparePssword(password);
  if(!isPasswordCorrect){
      throw new UnauthenticatedError("Invalid Credientials");
  }

  console.log(foundUser);
  const token = foundUser.createJWT();
 res.status(StatusCodes.OK).json({user:{name:foundUser.name},token})


};

module.exports = {
  register,
  login,
};
