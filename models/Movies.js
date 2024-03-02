const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieName : {
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
    dimention : { String },
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
    category : [{ type : String }],
    rated: { String },
    casts : [{ type : String }],
    about : { String },
    screening : {
        type: Boolean,
        default : false
    },
    from : { type : Date },
    to : { type : Date }
});

module.exports = mongoose.model('movies',movieSchema);