require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const databaseCon = require('./config/databaseCon');
const { logEvent } = require('./EventHandler/logEvent');
const errEvent = require('./EventHandler/errEvent');

const app = express();
const PORT = process.env.PORT || 3500;
databaseCon();

app.use(logEvent);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
});
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