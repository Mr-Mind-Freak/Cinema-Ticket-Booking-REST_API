const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true,
        set : name => name.toUpperCase()
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
    dimention : { type : String },
    languages : [
        {
            type : String,
            default : 'Tamil'
        }
    ],
    duration : { type : String },
    releaseDate : { 
        type : Date,
        default : Date.now
    },
    category : [{ type : String }],
    rated: { type : String },
    casts : [{ type : String }],
    about : { type : String },
    isMovie : {
        type : Boolean,
        default : false
    },
    isAnime : {
        type : Boolean,
        default: false
    },
    screening : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('movies',movieSchema);