const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    profile : {
        type : String,
        required: true
    },
    email : {
        type:String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required : true
    },
    phoneno : {
        type: Number
    },
    active : {
        type:Boolean,
        default: false
    },
    refreshToken : String
});

module.exports = mongoose.model('Users',userSchema);