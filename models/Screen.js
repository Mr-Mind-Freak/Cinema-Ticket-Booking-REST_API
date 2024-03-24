const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
    screenNo : {
        type : Number,
        required : true,
        unique : true
    },
    screenName : {
        type : String,
        required : true,
        unique : true
    },
    show1 : [{ 
        type : Number,
        set : n => Math.round(n),
        get : n => Math.round(n)
    }],
    show2 : [{
        type : Number,
        set : n => Math.round(n),
        get : n => Math.round(n)
    }],
    show3 : [{
        type : Number,
        set : n => Math.round(n),
        get : n => Math.round(n)
    }],
    movieName : {
        type : String,
        required : true,
        unique : true
    },
    from : {
        type : Date,
        default : Date.now()
    },
    to : { type : Date }
});

module.exports = mongoose.model('screen',screenSchema);