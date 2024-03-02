const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticketNo : {
        type : Number,
        required : true,
        unique : true
    },
    userName : {
        type : String,
        required : true
    },
    screenName : {
        type : String,
        required : true
    },
    show : {
        type : Number
    },
    date : {
        type : Date,
        default : Date.now()
    },
    time : { type : String },
    screenNo : {
        type : Number,
        required : true
    },
    movieName : {
        type : String,
        required : true
    },
    cost : {
        type : Number,
        required : true
    },
    seatNo : {
        type : String,
        required : true
    },
    no_of_tickets : {
        type : Number
    }
});

module.exports = mongoose.model('tickets',ticketSchema);