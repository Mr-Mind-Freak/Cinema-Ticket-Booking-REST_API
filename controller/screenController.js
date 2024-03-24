const Screen = require('../models/Screen');
const Movies = require('../models/Movies');

const getAllScreens = async(req, res) => {
    const screens = await Screen.find({});
    if(!screens.length) return res.sendStatus(204);
    res.status(200).json(screens);
}

const setupScreen= async(req, res) => {
    let { screenNo, screenName, show1, show2, show3, movieName, from, to } = req.body;
    if(!screenNo || !screenName || !movieName || !from || !to)
        return res.status(400).json({ message : 'All fields are required'});
    const movieDetails = await Movies.findOne({ name : movieName });
    if(!movieDetails) return res.status(400).json({ message : 'Movie details need to be added in database first'});
    if(!show1.lenght) show1 = [];
    if(!show2.length) show2 = [];
    if(!show3.length) show3 = [];
    if(from)
        from = new Date(from);
    if(to)
        to = new Date(to);
    try {
        const screen = await Screen.create({
            screenNo,
            screenName,
            show1,
            show2,
            show3,
            movieName,
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
    const { screenName, screenNo, show1, show2, show3, movieName, from, to } = req.body;
    if(!screenName || !screenNo) return res.status(400).json({ message : 'Screen name and no are required to update'});
    const screen = await Screen.findOne({ screenName, screenNo });
    if(!screen) return res.sendStatus(204);
    try {
        if(movieName)   screen.movieName = movieName;
        if(from) screen.from = new Date(from);
        if(to) screen.to = new Date(to);
        if(show1.length){
            let bookedSeats = screen.show1;
            bookedSeats = [...bookedSeats, ...show1];
            screen.show1 = bookedSeats;
        }
        if(show2.length){
            let bookedSeats = screen.show2;
            bookedSeats = [...bookedSeats, ...show2];
            screen.show2 = bookedSeats;
        }
        if(show3.length){
            let bookedSeats = screen.show3;
            bookedSeats = [...bookedSeats, ...show3];
            screen.show3 = bookedSeats;
        }
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
        const screens = await Screen.findOne({ movieName });
        if(!screens) return res.sendStatus(204);
        res.status(201).json(screens);
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message : err.messaage });
    }
}

module.exports = { getAllScreens, setupScreen, updateScreen, getMovieScreen };