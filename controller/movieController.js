const Movies = require('../models/Movies');
const Person = require('../models/Person');

const handleNewMovie = (req, res) => {
    console.log('control passed to handleNewMovie function');
    res.sendStatus(200);
}

module.exports = { handleNewMovie };