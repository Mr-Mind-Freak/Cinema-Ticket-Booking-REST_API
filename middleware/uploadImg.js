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

const personStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let filePath = path.join(__dirname,'..','data','person')
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
        cb(null, file.originalname+'-'+Date.now())
    }
});

const animeStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let filePath = path.join(__dirname,'..','data','anime')
        if(!fs.existsSync(filePath))
            await fsPromises.mkdir(filePath);
        cb(null, filePath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname+'-'+Date.now())
    }
});

const uploadProfile = multer({storage: profileStorage});
const uploadPerson= multer({storage: personStorage});
const uploadMovie= multer({storage: movieStorage});
const uploadAnime= multer({storage: animeStorage});

module.exports = { uploadProfile, uploadPerson, uploadMovie, uploadAnime };