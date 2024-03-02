const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
    screenNo : {
        type : Number,
        required : true,
    },
    screenName : {
        type : String,
        required : true,
    },
    show : { 
        type : Number,
        required : true
    },
    movieName : {
        type : String,
        required : true
    },
    bookedSeats : [{
        type : Number,
        set : n => Math.round(n),
        get : n => Math.round(n)
    }],
    from : {
        type : Date,
        default : Date.now()
    },
    to : { type : Date }
});

module.exports = mongoose.model('screen',screenSchema);