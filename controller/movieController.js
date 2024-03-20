const Movies = require('../models/Movies');

const getAllMovies = async(req, res) => {
    try{
        const movies = await Movies.find({},'name posters hashTags ratings votes category');
        if(!movies.length) return res.sendStatus(204);
        res.status(200).json(movies);
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ messsage : err.message });
    }
}

const handleNewMovie = async(req, res) => {
    const { name, dimention, duration, rated, about } = req.body;
    const votes = Number(req.body.votes);
    const languages = Array.from(req.body.languages.split(','));    // converting comma separated string into array
    const category= Array.from(req.body.category.split(','));
    const casts = Array.from(req.body.casts.split(','));
    let { releaseDate, ratings, hashTags, isMovie, isAnime, screening } = req.body;
    if(!hashTags.includes('#')) hashTags = '#'+hashTags;
    if(isMovie) isMovie = (String(isMovie).toLowerCase() === 'true'); // converting type string to boolean 
    if(isAnime) isAnime = (String(isAnime).toLowerCase() === 'true');
    screening = (String(screening).toLowerCase() === 'true');
    releaseDate = new Date(releaseDate); // converting type string to date object
    ratings = Number(ratings);
    if(!name || !ratings)
        return res.status(400).json({ message : 'All fields are required'});
    name = name.toLowerCase();
    const duplicate = await Movies.findOne({ name }).exec();
    if(duplicate) return res.status(409).json({ message : `${name} movie already exists in database`});
    try {
        let posters = []
        if(req.files){
            req.files.forEach (file => {
                posters.push(`http://localhost:3500/data/movies/${req.file.originalname}`);
            });
            const movie = await Movies.create({
                name,
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
                releaseDate,
                posters,
                screening,
                isMovie,
                isAnime
            });
            return res.status(201).json({ message : `Movie ${movie.name} successfully added into database`});
        }
        res.status(400).json({ message : `posters for ${name} is required`});
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message : err.message })
    }
}

const updateMovie = async (req, res) => {
    const { name } = req.body;
    let { ratings, votes, hashTags, screening } = req.body;
    if(!name) return res.status(400).json({ message : 'Movie name is required to update'});
    let movie = await Movies.findOne({ name });
    if(!movie) return res.sendStatus(204);
    try {
        if(ratings){
            ratings = Number(ratings);
            movie.ratings = ratings;
        }
        if(votes){
            votes = Number(votes);
            movie.votes = votes;
        }
        if(hashTags){
            if(!hashTags.includes('#')) hashTags = '#'+hashTags;
            movie.hashTags = hashTags;
        }
        if(screening){
            screening = (String(screening).toLowerCase() === 'true');
            movie.screening = screening;
        }
        const result = await movie.save();
        res.status(200).json({ message : 'Movie details successfully updated'});
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message : err.message });    
    }
}

const deleteMovie = async(req, res) => {
    const { name } = req.body;
    if(!name) return res.status(400).json({ message : 'Movie name is required for delete operation'});
    const movie = await Movies.findOne({ name });
    if(!movie) return res.sendStatus(204);
    try {
        const result = await Movies.deleteOne({ name });
        if(result.acknowledged)
            return res.status(200).json({message:`${name} successfully deleted`});
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({"message":"server error"});
    }
}

const getSingleMovie = async(req, res) => {
    const name = req.params.name;
    if(!name) return res.status(400).json({ message : 'Name is required to access particular movie'});
    try{
        const movie = await Movies.findOne({ name });
        if(!movie) return res.sendStatus(204); 
        res.status(200).json(movie);
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message : err.message });
    }
}
module.exports = { getAllMovies, handleNewMovie, updateMovie, deleteMovie, getSingleMovie };