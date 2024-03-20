const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    image : {
        type: String,
        required: true
    },
    occupation : {
        type : String,
        default : 'Actor'
    },
    dob : { Date },
    birthPlace : {
        type : String,
        default : 'India'
    },
    about : {
        type : String,
        default : 'One of the good actor'
    }
});

module.exports = mongoose.model('person',personSchema)