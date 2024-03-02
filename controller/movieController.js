const Movies = require('../models/Movies');
const Person = require('../models/Person');

const getAllMovies = async(req, res) => {
    try{
        const movies = await Movies.find({},'movieName posters hashTags ratings votes category');
        if(!movies.length) return res.sendStatus(204);
        res.status(200).json(movies);
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ messsage : err.message });
    }
}

const handleNewMovie = async(req, res) => {
    const { movieName, dimention, duration, rated, about} = req.body;
    const votes = Number(req.body.votes);
    const languages = Array.from(req.body.languages.split(','));    // converting comma separated string into array
    const category= Array.from(req.body.category.split(','));
    const casts = Array.from(req.body.casts.split(','));
    let { screening, releaseDate, from, to, ratings, hashTags } = req.body;
    if(!hashTags.includes('#')) hashTags = '#'+hashTags;
    screening = (String(screening).toLowerCase() === 'true'); // converting type string to boolean 
    releaseDate = new Date(releaseDate); // converting type string to date object
    from = new Date(from);
    to = new Date(to);
    ratings = Number(ratings);
    if(!movieName || !ratings)
        return res.status(400).json({ message : 'All fields are required'});
    const duplicateMovie = await Movies.findOne({ movieName }).exec();
    if(duplicateMovie) return res.status(409).json({ message : `${movieName} movie already exists in database`});
    try {
        let posters = []
        if(req.files){
            req.files.forEach (file => {
                posters.push({
                    data : file.path,
                    contentType : 'image/jpg'
                });
            });
            const movie = await Movies.create({
                movieName,
                hashTags,
                ratings,
                votes, 
                dimention,
                languages, 
                duration,
                category,
                rated,
                casts,
                about,
                screening,
                releaseDate,
                posters,
                from,
                to
            });
            return res.status(201).json({ message : `Movie ${movie.movieName} successfully added into database`});
        }
        res.status(400).json({ message : `posters for ${movieName} is required`});
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message : err.message })
    }
}

const updateMovie = async (req, res) => {
    const { movieName } = req.body;
    let { from, to } = req.body;
    if(!movieName || !from || !to) return res.status(400).json({ message : 'Movie name, from date, to date are required to update'});
    from = new Date(from);
    to = new Date(to);
    let movie = await Movies.findOne({ movieName });
    if(!movie) return res.sendStatus(204);
    try {
        movie.from = from;
        movie.to = to;
        const result = await movie.save();
        res.status(200).json({ message : 'Movie details successfully updated'});
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message : err.message });    
    }
}

const deleteMovie = async(req, res) => {
    const { movieName } = req.body;
    if(!movieName) return res.status(400).json({ message : 'Movie name is required for delete operation'});
    const movie = await Movies.findOne({ movieName });
    if(!movie) return res.sendStatus(204);
    try {
        const result = await Movies.deleteOne({ movieName });
        if(result.acknowledged)
            return res.status(200).json({message:`${moviename} successfully deleted`});
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({"message":"server error"});
    }
}

const getSingleMovie = async(req, res) => {
    const movieName = req.params.movieName;
    if(!movieName) return res.status(400).json({ message : 'Name is required to access particular movie'});
    try{
        const movie = await Movies.findOne({ movieName });
        if(!movie) return res.sendStatus(204); 
        res.status(200).json(movie);
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message : err.message });
    }
}
module.exports = { getAllMovies, handleNewMovie, updateMovie, deleteMovie, getSingleMovie };