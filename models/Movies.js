const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true,
        set : name => name.toLowerCase()
    },
    poster : {
        type: String
    },
    images : [{
        type : String
    }],
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
    language : {
            type : String,
            default : 'Tamil'
    },
    duration : { type : String },
    category : { type : String },
    actor : {
        name : { type : String},
        pic : { type : String },
    },
    actress : {
        name : { type : String},
        pic : { type : String },
    },
    director : {
        name : { type : String},
        pic : { type : String },
    },
    music : {
        name : { type : String},
        pic : { type : String },
    },
    cinematography : {
        name : { type : String},
        pic : { type : String },
    },
    story : {
        name : { type : String},
        pic : { type : String },
    },
    about : { type : String },
    screening : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('movies',movieSchema);