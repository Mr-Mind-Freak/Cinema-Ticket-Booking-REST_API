const router = require('express').Router();
const screenController = require('../../controller/screenController');

router.route('/')
    .get(screenController.getAllScreens)
    .post(screenController.setupScreen)
    .patch(screenController.updateScreen);

router.route('/:moviename').get(screenController.getMovieScreen);

module.exports = router;