const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const setAccessToken = (user) => {
    const payload = {
        username: user.username,
        password: user.password
    }
    const secret = process.env.ACCESS_TOKEN;
    const options = { expiresIn: '1h' };
    const access_token = jwt.sign(payload,secret,options);
    return access_token;
}

const setRefreshToken = async(user) => {
    const payload = {
        username: user.username
    }
    const secret = process.env.REFRESH_TOKEN;
    const options = { expiresIn: '1d' };
    const refresh_token = jwt.sign(payload,secret,options);
    user.refreshToken = refresh_token;
    const result = await user.save();
    return refresh_token;
}

const handleLogin = async(req,res) => {
    const { email, password } = req.body;
    if(!email || !password)
        return res.status(400).json({"message":" username and password are required"});
    
    const foundUser = await User.findOne({ email }).exec();
    if(!foundUser)
        return res.status(400).json({"message":"No User found"});
    
    const match = await bcrypt.compare(password, foundUser.password);

    if(!match)
        return res.status(401).json({"message":"Incorrect username or password"});

    const accessToken = setAccessToken(foundUser);
    const refreshToken = setRefreshToken(foundUser);
    res.cookie('jwt',refreshToken,{ httpOnly: true, secure: true, sameSite: 'None', maxAge: 5 * 24 * 60 * 60 * 1000 });
    res.status(200).json({ accessToken });
}

module.exports= { handleLogin };