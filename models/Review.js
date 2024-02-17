const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    movie_name : {
        type : String,
        required : true
    },
    hashtags : {
        type : String,
        default : '#Good'
    },
    content : {
        type : String,
        default : 'Good to watch'
    },
    no_of_likes : {
        type : Number,
        default : 1,
        get : n => Math.round(n),
        set : n => Math.round(n)
    },
    ratings : {
        type : Number,
        required : true,
        get : n => Math.round(n),
        set : n => Math.round(n)
    },
    uploaded_on : {
        type : Date,
        required : true,
        default : Date.now
    }
});

module.exports = mongoose.model('Reviews',reviewSchema); 