const User = require('../models/User');
const bcrypt = require('bcrypt');
const { setAccessToken, setRefreshToken } = require('./setTokens');

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
    else
        foundUser.active = true;
    const accessToken = setAccessToken(foundUser);
    const refreshToken = await setRefreshToken(foundUser);
    res
        .status(202)
        .cookie('jwt',refreshToken,{ expires: new Date(Date.now() + 10 * 86400000) })
        .json({ accessToken, "username": foundUser.username, "profile" : foundUser.profile  });
}

module.exports= { handleLogin };