const User = require('../models/User');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { setAccessToken, setRefreshToken } = require('./setTokens');

const handleNewUser = async(req, res) => {
    let { username, email, password, phoneno } = req.body;
    if(!username || !email || !password || !phoneno)
        return res.status(400).json({"message":"All fields are required"});

    let duplicateUser = await User.findOne({ username }).exec();
    let duplicateMail = await User.findOne({ email }).exec();
    if(duplicateUser)
        return res.status(409).json({ "message": "User name already exists in the database"});
    if(duplicateMail)
        return res.status(409).json({"message":"This email already exists in our database"});
    
    try {
        const hashpwd = await bcrypt.hash(password, 10);
        const user = await User.create({
            username:username,
            profile : {
                data : req.file.path,
                contentType: 'image/jpg'
            },
            email:email,
            password: hashpwd,
            phoneno:phoneno,
            active:true
        });
        const accessToken = setAccessToken(user);
        const refreshToken = await setRefreshToken(user);
        res.cookie('jwt',refreshToken,{ httpOnly: true, secure: true, sameSite: 'None', maxAge: 2 * 24 * 60 * 60 * 1000 });
        res.status(201).json({ accessToken, "username": user.username, "message":`Account ${username} is created successfully` });
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({"message": err.message});
    }
}

module.exports = { handleNewUser };