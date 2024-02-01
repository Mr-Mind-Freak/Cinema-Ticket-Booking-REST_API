const { logger } = require('./logEvent');

const errHandler =  (err, req, res, next) => {
    logger(`${err.name} : ${err.message}`,'errlogs.txt');
    console.log(err.stack);
    res.status(500).send(err.message);
}

module.exports = errHandler;