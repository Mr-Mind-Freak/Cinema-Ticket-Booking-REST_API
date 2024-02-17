const router = require('express').Router();
const changePasswordController = require('../controller/changePasswordController');

router.post('/',changePasswordController.changePassword);

module.exports = router;