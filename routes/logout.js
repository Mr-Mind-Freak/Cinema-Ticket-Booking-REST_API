const router = require('express').Router();
const logoutController = require('../controller/logoutController');

router.post('/',logoutController.handleLogout);

module.exports = router;