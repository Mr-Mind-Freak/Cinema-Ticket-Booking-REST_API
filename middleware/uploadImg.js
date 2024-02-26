const multer = require('multer');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const storageEngine = multer.diskStorage({
    destination: async (req, file, cb) => {
        if(!fs.existsSync(path.join(__dirname,'..','data')))
            await fsPromises.mkdir(path.join(__dirname,"..",'data'));
        cb(null, path.join(__dirname,"..",'data'))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({storage: storageEngine});

module.exports = upload;