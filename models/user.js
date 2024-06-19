require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Improved user schema with robust validation and error messages:
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    minLength: 5,
    maxLength: 50,
    unique: true, // Ensures unique email addresses
    match: [
      /^\w+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/, // More concise and efficient email format validation
      "Please provide a valid email address (e.g., john.doe@example.com)",
    ],
  },
  password:{
    type:String,
    required:[true,"Please Provide a Password"],
    minLength:6,
  }
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.createJWT = function(){
   const token = jwt.sign({name:this.name,userId:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME});
   return token;
  }
userSchema.methods.comparePssword= async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword,this.password);
  return isMatch;
}  

// Export the user schema to be used in other parts of your application:
module.exports = mongoose.model("User", userSchema);
