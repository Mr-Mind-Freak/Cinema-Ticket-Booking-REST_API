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
    if(duplicateUser)return res.status(409).json({ "message": "User name already exists in the database"});
    if(duplicateMail)
        return res.status(409).json({"message":"This email already exists in our database"});
    
    try {
        const hashpwd = await bcrypt.hash(password, 10);
        const user = await User.create({
            username:username,
            profile : {
                data : req.file.path,
                contentType: req.file.mimetype
            },
            email:email,
            password: hashpwd,
            phoneno:phoneno,
            active:true
        });
        const accessToken = setAccessToken(user);
        const refreshToken = await setRefreshToken(user);
        const responseResult = {
            username : user.username,
            profile : user.profile,
            message : `Account ${username} is created successfully`,
            accessToken
        }
        res
            .status(202)
            .cookie('jwt',refreshToken)
            .json(responseResult);
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({"message": err.message});
    }
}

module.exports = { handleNewUser };