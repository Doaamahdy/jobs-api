const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    company:{
        type:String,
        required:[true,"Please Provide a Company Name "],
        maxLength:50,
    },
    position:{
        type:String,
        required:[true,"Please Provide a Postion"],
        maxLength:100,
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending',
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref :'User',
        required:[true,"Please Provided a User"],

    },

},{timestamps:true})
module.exports = mongoose.model('Job',jobSchema);