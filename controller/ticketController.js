const Ticket = require('../models/Ticket');
const Screen = require('../models/Screen');

const randomNumber = async () => {
    let ticketNo = Math.floor(Math.random() * 1000000);
    let ticket = await Ticket.findOne({ ticketNo });
    if(ticket){
        while(ticketNo === ticket.ticketNo){
            ticketNo = Math.floor(Math.random() * 1000000);
            ticket = await Ticket.findOne({ ticketNo });
            if(!ticket) break;
        }
    }
    return ticketNo;
}

const getAllTickets = async(req, res) => {
    const tickets = await Ticket.find({});
    if(!tickets.length) return res.sendStatus(204);
    res.status(200).json(tickets);
}

const bookTicket = async(req, res) => {
    const { screenName, screenNo, show, time, movieName, cost, seatNo, no_of_tickets} = req.body;
    let userName = req.username;
    let { date } = req.body;
    if(!screenName || !userName || !show || !screenNo || !movieName || !cost || !seatNo || !time)
        return res.status(400).json({ message : 'All fields are required'});
    const movie = await Screen.findOne({ screenName, show, movieName });
    if(!movie) return res.status(409).json({ messaage : "Invalid show time"});
    if(date) date = new Date(date);
    const ticketNo = await randomNumber();
    try {
        const ticket = await Ticket.create({
            ticketNo, screenName, screenNo, show, userName, time, movieName, cost, seatNo, no_of_tickets, date
        });
        res.status(201).json(ticket);
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message : err.messaage });
    }
}

const deleteTicket = async(req, res) => {
    const {ticketNo }= req.body;
    if(!ticketNo) return res.status(400).json({ messaage : 'Ticket No is required'});
    try {
        const ticket = await Ticket.findOne({ ticketNo });
        if(!ticket) return res.sendStatus(204);
        const result = await Ticket.deleteOne({ ticketNo });
        if(result.acknowledged)
            return res.status(200).json({message:`${ticketNo} successfully deleted`});
        res.status(500).json({message : 'server error'});
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({"message":"server error"});
    }
}

const getSingleUserTicket = async(req, res) => {
    const userName = req.params.username;
    if(!userName) return res.status(400).json({ message : 'Username is required to get tickets of single user'});
    const tickets = await Ticket.find({ userName });
    if(!tickets.length) return res.sendStatus(204);
    res.status(200).json(tickets);
}

module.exports = { getAllTickets, bookTicket, deleteTicket, getSingleUserTicket };