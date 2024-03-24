const Movies = require('../models/Movies');

const getAllMovies = async(req, res) => {
    try{
        const movies = await Movies.find({},'name poster hashTags category duration screening actor actress director music about');
        if(!movies.length) return res.sendStatus(204);
        res.status(200).json(movies);
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ messsage : err.message });
    }
}

const handleNewMovie = async(req, res) => {
    const { dimention, duration, about, language, category, actorName, actressName, directorName, musicName, cinematographyName, storyName } = req.body;
    let name = req.body.name;
    const votes = Number(req.body.votes);
    let { ratings, hashTags, screening } = req.body;
    if(!hashTags.includes('#')) hashTags = '#'+hashTags;
    screening = (String(screening).toLowerCase() === 'true'); // converting type string to boolean
    ratings = Number(ratings);
    if(!name || !ratings)
        return res.status(400).json({ message : 'All fields are required'});
    name = name.toLowerCase();
    const duplicate = await Movies.findOne({ name }).exec();
    if(duplicate) return res.status(409).json({ message : `${name} movie already exists in database`});
    if(req.files.length < 10 || req.files.length>10){
        return res.status(400).json({message : '10 images are needed'})
    }
    try {
        let images = [];
        for (let index = 1; index <= 3; index++) {
            images.push(`http://localhost:3500/data/movies/${req.files[index].originalname}`);
        }
        const movie = await Movies.create({
            name,
            poster : `http://localhost:3500/data/movies/${req.files[0].originalname}`,
            images,
            hashTags,
            ratings,
            votes, 
            dimention,
            language, 
            duration,
            category,
            about,
            screening,
            actor : {
                name : actorName,
                pic : `http://localhost:3500/data/movies/${req.files[4].originalname}`
            },
            actress : {
                name : actressName,
                pic : `http://localhost:3500/data/movies/${req.files[5].originalname}`
            },
            director : {
                name : directorName,
                pic : `http://localhost:3500/data/movies/${req.files[6].originalname}`
            },
            music : {
                name : musicName,
                pic : `http://localhost:3500/data/movies/${req.files[7].originalname}`
            },
            cinematography : {
                name : cinematographyName,
                pic : `http://localhost:3500/data/movies/${req.files[8].originalname}`
            },
            story : {
                name : storyName,
                pic : `http://localhost:3500/data/movies/${req.files[9].originalname}`
            },
        });
        return res.status(201).json({ message : `Movie ${movie.name} successfully added into database`});
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message : err.message })
    }
}

const updateMovie = async (req, res) => {
    const { name } = req.body;
    let { screening } = req.body;
    if(!name) return res.status(400).json({ message : 'Movie name is required to update'});
    let movie = await Movies.findOne({ name });
    if(!movie) return res.sendStatus(204);
    try {
        screening = (String(screening).toLowerCase() === 'true');
        movie.screening = screening;
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