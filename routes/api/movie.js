const router = require('express').Router();
const movieController = require('../../controller/movieController');

router.route('/')
    .post(movieController.handleNewMovie)

module.exports = router;