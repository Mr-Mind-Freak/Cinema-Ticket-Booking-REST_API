require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const databaseCon = require('./config/databaseCon');
const { logEvent } = require('./middleware/logEvent');
const errEvent = require('./middleware/errEvent');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');

const app = express();
const PORT = process.env.PORT || 3500;
databaseCon();

app.use(logEvent);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/auth'));
app.use('/register',require('./routes/register'));
app.all('*',(req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname,'views','404.html'));
    } else if (req.accepts('json')) {
        res.json({'error': ' 404 file not found'});
    } else {
        res.type('txt').send('file not found');
    }
});
app.use(errEvent);
mongoose.connection.once('open',()=>{
    console.log('Database is connected');
    app.listen(PORT,()=>{
        console.log(`Server is running on PORT ${PORT}`)
    });
});