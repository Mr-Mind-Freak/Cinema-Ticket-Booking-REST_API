const path = require('path');
const { format } = require('date-fns');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logger = async(data,file) =>{
    try {
        if(!fs.existsSync(path.join(__dirname,'..','Logs')))
            await fsPromises.mkdir(path.join(__dirname,"..","Logs"));
        await fsPromises.appendFile(path.join(__dirname,'..','Logs',file),data);
        console.log('message logged!...');
    } catch (err) {
        console.log(err.stack);
    }
}

const logEvent = (req, res, next) => {
    let msg = `${req.method}\t${req.headers.origin}\t${req.url}`;
    const data = `${format(new Date,'yyyyMMdd\tHH:mm:ss')} ${msg}`;
    logger(data,'log.txt');
    next();
}

module.exports = {logEvent,logger};