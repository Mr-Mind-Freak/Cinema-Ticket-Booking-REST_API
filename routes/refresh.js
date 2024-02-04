const router = require('express').Router();
const refreshTokenController = require('../controller/refreshTokenController');

router.get('/',refreshTokenController.handleRefreshToken);

module.exports = router;