const whiteList = require('./whiteList');

const corsOptions = {
    origin : (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin)
            callback(null, true);
        else
            console.log(new Error('Not allowed by cors'));
    },
    methods: ['GET','POST','PATCH','DELETE'],
    credentials: true,
    optionsSuccessStatus : 200
};

module.exports = corsOptions;