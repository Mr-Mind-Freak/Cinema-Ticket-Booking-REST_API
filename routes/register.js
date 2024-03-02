const router = require('express').Router();
const registerController = require('../controller/registerController');
const{ uploadProfile }= require('../middleware/uploadImg');

router.post('/',uploadProfile.single('image'),registerController.handleNewUser);

module.exports = router;