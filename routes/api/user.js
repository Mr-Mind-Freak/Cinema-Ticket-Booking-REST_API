const router= require('express').Router();
const userController = require('../../controller/userController');

router.route('/')
    .get(userController.getAllUser)
    .delete(userController.deleteUser);

router.route('/:username')
    .get(userController.getUser);

module.exports = router;