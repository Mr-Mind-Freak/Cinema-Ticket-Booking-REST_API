const router = require('express').Router();
const registerController = require('../controller/registerController');
const upload = require('../middleware/uploadImg');

router.post('/',upload.single('image'),registerController.handleNewUser);

module.exports = router;