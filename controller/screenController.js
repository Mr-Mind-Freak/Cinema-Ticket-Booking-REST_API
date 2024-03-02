const Screen = require('../models/Screen');
const Movies = require('../models/Movies');

const getAllScreens = async(req, res) => {
    const screens = await Screen.find({});
    if(!screens.length) return res.sendStatus(204);
    res.status(200).json(screens);
}

const setupScreen= async(req, res) => {
    let { screenNo, screenName, show, movieName, bookedSeats, from, to } = req.body;
    if(!screenNo || !screenName || !show || !movieName || !from || !to)
        return res.status(400).json({ message : 'All fields are required'});
    const movieDetails = await Movies.findOne({ name : movieName });
    if(!movieDetails) return res.status(400).json({ message : 'Movie details need to be added in database first'});
    screenNo = Number(screenNo);
    show = Number(show);
    if(from)
        from = new Date(from);
    if(to)
        to = new Date(to);
    console.log(bookedSeats);
    try {
        const screen = await Screen.create({
            screenNo,
            screenName,
            show,
            movieName,
            bookedSeats,
            from,
            to
        });
        res.status(201).json({message : 'Screen details successfully added'});
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message : err.message });
    }
}

const updateScreen = async(req, res) => {
    const { screenName, show, movieName, from, to, bookedSeats } = req.body;
    if(!screenName || !show) return res.status(400).json({ message : 'Screen name and show are required to update'});
    const screen = await Screen.findOne({ screenName, show });
    if(!screen) return res.sendStatus(204);
    try {
        if(movieName)   screen.movieName = movieName;
        if(from) screen.from = new Date(from);
        if(to) screen.to = new Date(to);
        if(bookedSeats.length) screen.bookedSeats = bookedSeats;
        const result = screen.save();
        res.status(200).json({ message : 'screen details successfully updated'});
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ messaage : err.message});
    }
}

const getMovieScreen = async(req, res) => {
    const movieName = req.params.moviename;
    if(!movieName) return res.status(400).json({ message : 'Movie name is required to retrieve screens of a movie'});
    try {
        const screens = await Screen.find({ movieName });
        if(!screens.length) return res.sendStatus(204);
        res.status(200).json(screens);
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message : err.messaage });
    }
}

module.exports = { getAllScreens, setupScreen, updateScreen, getMovieScreen };