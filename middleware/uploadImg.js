const multer = require('multer');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const profileStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let filePath = path.join(__dirname,'..','data')
        if(!fs.existsSync(filePath))
            await fsPromises.mkdir(filePath);
        cb(null, filePath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const movieStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let filePath = path.join(__dirname,'..','data','movies')
        if(!fs.existsSync(filePath))
            await fsPromises.mkdir(filePath);
        cb(null, filePath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const uploadProfile = multer({storage: profileStorage});
const uploadMovie= multer({storage: movieStorage});

module.exports = { uploadProfile, uploadMovie };