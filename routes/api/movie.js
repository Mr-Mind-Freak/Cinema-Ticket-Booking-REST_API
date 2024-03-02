const router = require('express').Router();
const movieController = require('../../controller/movieController');
const { uploadMovie } = require('../../middleware/uploadImg');

router.route('/')
    .get(movieController.getAllMovies)
    .post(uploadMovie.array('posters',12),movieController.handleNewMovie)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie);

router.route('/:movieName').get(movieController.getSingleMovie);

module.exports = router;