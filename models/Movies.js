const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieName : {
        type : String,
        unique : true,
        required : true
    },
    posters : [
        {
            data : Buffer,
            contentType : String
        }
    ],
    hashTags :{
        type : String,
        default : '#latest movies'
    },
    ratings : {
        type : Number,
        required : true,
    },
    votes : {
        type: Number,
        default : 1,
        get : n => Math.round(n),
        set : n => Math.round(n)
    },
    dimentions : { String },
    languages : [
        {
            type : String,
            default : 'Tamil'
        }
    ],
    duration : { String },
    releaseDate : { 
        type : Date,
        default : Date.now
    },
    category : [{ String }],
    rated: { String },
    casts : [{ String }],
    about : { String }
});

module.exports = mongoose.model('movies',movieSchema);