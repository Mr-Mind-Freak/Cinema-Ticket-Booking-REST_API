const User = require('../models/User');
const bcrypt = require('bcrypt');

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
        const result = await User.create({
            "username":username,
            "email":email,
            "password": password,
            "phoneno":phoneno
        });
        console.log(result);
        res.status(201).json({"message":`Account ${username} is created successfully`});
    } catch (err) {
        res.status(500).json({"message": err.message});
    }
}

module.exports = { handleNewUser };